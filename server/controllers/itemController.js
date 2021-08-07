const { Restaurant } = require("../models/restaurant");
const { Account } = require("../models/account");
const { Items } = require("../models/item");
const { validateItem } = require("../middleware/validation");

exports.addItem = async (req, res) => {
  const { error } = validateItem(req.body);

  if (error) return res.status(400).send("Enter data  correctly.");

  const { name, price, category, description } = req.body;

  let restaurant = await Restaurant.findOne({
    account: req.loggedInUserId,
  });
  //console.log("This is the restaurant we found", restaurant);

  try {
    if (!restaurant)
      return res.status(404).json({
        message: "No restaurant exists with this id",
        restaurant: restaurant,
        restId: req.loggedInUserId,
      });

    let newItem = new Items({
      name: name,
      price: price,
      category: category,
      description: description,
      restaurant: restaurant._id,
    });

    restaurant.items.push(newItem);
    let updatedRestaurant = await restaurant.save();

    if (!updatedRestaurant)
      return res.status(400).json({
        message: "Could not save and fetch your updated restaurant",
        restaurant: updatedRestaurant,
      });
    else {
      let fetchedItem = await newItem.save();
      if (!fetchedItem)
        return res.status(500).json({
          message: "Could not save your item",
          item: fetchedItem,
        });
      else {
        return res.status(200).json({
          message: "Restaurant menu and items collections have been updated.",
          data: {
            restaurantData: updatedRestaurant,
            itemData: fetchedItem,
          },
        });
      }
    }
  } catch (error) {
    if (error)
      return res.status(500).json({
        message: "There was a problem while saving your data.",
        error: error,
      });
  }
};

exports.deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId)
    return res.status(400).send("There was no id recieved in the request body");

  try {
    let item = await Items.findById(itemId);
    if (!item) return res.status(404).send("Item not in databae.");

    let restaurantId = item.restaurant;
    if (!restaurantId)
      return res
        .status(404)
        .send("Could not find restaurant with this id in items schema.");

    let deletedItem = await Items.findByIdAndDelete(itemId);
    if (!deletedItem)
      return res.status(400).send("Could not find item to delete");

    let restaurant = Restaurant.findByIdAndUpdate(restaurantId, {
      $pull: { items: { $in: [`${itemId}`] } },
    });
    await restaurant.save();

    return res.status(200).json({
      message: "Restautant was updated",
      data: restaurant,
    });
  } catch (error) {
    if (error)
      return res.status(400).json({
        message: "Something went wrong while sending response back.",
        error: error,
      });
  }
};

exports.updateItem = async (req, res) => {
  const itemId = req.params.itemId;

  if (!itemId)
    return res.status(404).json({
      message: "Could not find item id",
      itemId: itemId,
    });

  const { name, price, category, description } = req.body;

  try {
    if (!itemId)
      return res
        .status(404)
        .send("There was no item id found in the request body.");

    let item = await Items.findById(itemId);
    item.name = name;
    item.price = price;
    item.category = category;
    item.description = description;
    await item.save();

    return res.status(200).json({
      message: "Item was successfully saved",
      data: item,
    });
  } catch (error) {
    if (error)
      return res.status(400).json({
        message: "Item could not be updated. Try again",
        error: error,
      });
  }
};

exports.getItems = async (req, res) => {
  if (!req.loggedInUserId) return res.status(400).send("User id no found");

  try {
    const restaurantAccount = await Account.findById(req.loggedInUserId);
    if (!restaurantAccount)
      return res.status(404).send("Restaurant Account not found.");

    const restaurant = await Restaurant.findOne({
      account: restaurantAccount._id,
    });
    if (!restaurant)
      return res.status(404).send("Restaurant user does not exist.");

    const items = await Items.find({ _id: { $in: restaurant.items } });
    if (!items) {
      return res.status(404).send("Items not found in items collections.");
    } else {
      return res.status(200).json({
        message: "Got all your items.",
        data: items,
      });
    }
  } catch (error) {
    if (error)
      return res.status(400).json({
        message: "Could not get your items",
        error: error,
      });
  }
};

exports.getItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId) return res.status(400).send("No user id found in params");

  try {
    let item = Item.findById(itemId);
    if (!item) {
      return res.status(404).send("Item could not be found");
    } else {
      return res.status(200).json({
        message: "Found your item.",
        data: item,
      });
    }
  } catch (error) {
    if (error)
      return res.status(400).json({
        message: "Could not get your items some error occured",
        error: error,
      });
  }
};
