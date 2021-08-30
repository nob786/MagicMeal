const { Restaurant } = require("../models/restaurant");
const { Comments } = require("../models/comments");
const { Customer } = require("../models/customer");
const { Bookings } = require("../models/booking");
const { Account } = require("../models/account");
const { Orders } = require("../models/order");
const { validateComment } = require("../middleware/validation");
const mongoose = require("mongoose");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    if (!restaurants) return res.status(404).send("No restaurant found.");
    return res.status(200).json({
      message: "These are all the restaurants in database.",
      data: restaurants,
    });
  } catch (error) {
    if (error)
      return res.status(500).json({
        message: "Server Error",
        error: error,
      });
  }
};

exports.getRestaurantMenus = async (req, res) => {
  const restaurantId = req.params.restId;
  console.log(req.params.restId);
  // const isValid = mongoose.Types.ObjectId.isValid(restaurantId);
  // console.log("Rest ID", req.params);
  // console.log("Valid or not", isValid);
  if (!restaurantId)
    return res.status(404).json({
      message: "Could not find restaurant id in params",
      data: restaurantId,
    });

  try {
    const restaurant = await Restaurant.findById({
      _id: restaurantId,
    }).populate("items");
    console.log("Restaurant", restaurant);

    if (!restaurant)
      return res.status(404).json({
        message: "Could not return restaurant.",
        data: restaurant,
      });
    else {
      return res.status(200).json({
        message: "Restaurant and its items returned successfully!",
        data: restaurant,
      });
    }
  } catch (error) {
    if (error)
      return res.status(500).json({
        message:
          "Something went wrong in try block while sending back response.",
        error: error,
      });
  }
};

exports.postOrder = async (req, res) => {
  const orderData=  req.params.OrderData;
  console.log("Order Data",req.body);
  const {restaurantData,customerData,items,grandTotal}=req.body;
  const restaurantId = req.params.restId;
  const userId = req.loggedInUserId;
  const itemsArray = items.map((i) => {
    return { 
      itemId: i._id,
      itemName: i.itemName,
      itemDescription: i.description,
      price: i.price,
      quantity: i.quantity,
      total: i.total ,
  }});
  //console.log("User Id", userId);
  
  //console.log("Items array", arrayOfItems);

  if (!userId)
    return res.status(404).json({
      message: "No id provided to find user.",
      data: userId,
    });
  if (!restaurantId)
    return res.status(404).json({
      message: "Could not get restaurnat id.",
      data: restaurantId,
    });

  const customerAccount = await Account.findById(userId);
  if (!customerAccount)
    return res.status(404).json({
      message: "Could not find account.",
      data: account,
    });
  const customer = await Customer.findOne({
    account: customerAccount._id,
  });

  if (!customer)
    return res.status(404).json({
      message: "No customer found with this account id.",
      data: customer,
    });

  // const restaurantAccount = await Account.findById(restaurantId);

  // if (!restaurantAccount)
  //   return res.status(404).json({
  //     message: "Could not find restaurant account",
  //     data: restaurantAccount,
  //   });

  const restaurant = await Restaurant.findById(
    restaurantId
    // account: restaurantAccount._id,
  );
  //console.log(restaurant);
  if (!restaurant)
    return res.status(404).json({
      message: "Could not find the restaurant",
      data: restaurant,
    });

  let newOrder = new Orders({
    
    customer: {
      name: customerData.name,
      contact: customerData.contact,
      customerId: customerData.customerId,
      customerAddress: customerData.customerAddress,
    },
    restaurant: {
      restaurantName: restaurantData.restaurantName,
      contact: restaurantData.contact,
      restaurantId: restaurantData._id,
    },
    items: itemsArray,
    grandTotal: grandTotal,
    status: "pending",
  });

  await newOrder
    .save()
    .then((data) => {
      console.log("Data", data);
      return res.status(200).json({
        message: "Order saved",
        data: data,
      });
    })
    .catch((error) => {
      if (error)
        return res.status(500).json({
          messsage: "Could not send back response",
          error: error,
        });
    });
};

exports.bookTable = async (req, res) => {
  const userId = req.loggedInUserId;
  const restaurantId = req.params.restaurantId;

  if (!userId) {
    return res.status(404).send("Did not get user id.");
  }
  if (!restaurantId) {
    return res.status(404).send("Did not get restaurant id from params.");
  }

  const customerAccount = await Account.findById(userId);
  if (!customerAccount)
    return res.status(404).send("Customer nor found in database.");

  const customer = await Customer.findOne({
    account: customerAccount._id,
  });
  if (!customer) return res.status(404).send("Did not find customer object");

  const restaurantAccount = await Account.findById(restaurantId);
  if (!restaurantAccount)
    return res.status(404).send("Restaurant account not found");

  const restaurant = await Restaurant.findOne({
    account: restaurant._id,
  }).populate({ path: "bookings" });

  if (!restaurant)
    return res.status(404).send("Did not find restaurant object.");

  if (restaurant.bookings.availableTables === 0) {
    return res.status(404).json({
      message: "All tables have been booked.",
    });
  } else {
    let newBooking = new Bookings({});
  }
};

exports.postComment = async (req, res) => {
  //console.log("Comment api called.");
  const userId = req.loggedInUserId;
  const restaurantId = req.params.restId;
  console.log("Rest Id", req.params.restId); //req.params.restId;
  const { error } = validateComment(req.body);

  if (error)
    return res.status(400).json({
      message: "Error. Enter Data correctly ",
      error: error,
    });

  const { comment } = req.body;

  if (!userId) {
    return res.status(404).send("User id not found.");
  }
  if (!restaurantId) {
    return res.status(404).send("Restaurant id not found");
  }

  const customerAccount = await Account.findById(userId);
  if (!customerAccount)
    return res.status(404).send("Customer nor found in database.");

  const customer = await Customer.findOne({
    account: customerAccount._id,
  });
  if (!customer) return res.status(404).send("Did not find customer object");

  // const restaurantAccount = await Account.findById(restaurantId);
  // if (!restaurantAccount)
  //   return res.status(404).send("Restaurant account not found");

  const restaurant = await Restaurant.findById(restaurantId);
  console.log("This is the restaurant", restaurant);

  if (!restaurant)
    return res.status(404).send("Did not find restaurant object.");

  let newComment = new Comments({
    customer: {
      name: customer.firstName + " " + customer.lastName,
      customerId: customer._id,
    },
    restaurant: {
      name: restaurant.restaurantName,
      restaurantId: restaurant._id,
    },
    comment: comment,
  });

  console.log("New Comment Created", newComment);

  await newComment
    .save()
    .then((data) => {
      return res.status(200).json({
        message: "Comment successful",
        data: data,
      });
    })
    .catch((error) => {
      if (error)
        res.status(500).json({
          message: "Could not save comment to database",
          error: error,
        });
    });
};

exports.deleteComment = async (req, res) => {
  console.log("Comment delete API called!");
  const userId = req.loggedInUserId;
  const customerAccount = await Account.findById(userId);

  if (!customerAccount)
    return res.status(404).send("Customer Account not found.");

  const customer = await Customer.findOne({
    account: customerAccount._id,
  }).populate({ path: "comments", select: "_id" });
  console.log("Customer with comments", customer);
  if (!customer)
    return res.status(404).send("Could not find your customer object.");

  const commentId = customer.comments[0]._id;
  console.log("Comment id", commentId);
  await Comments.findByIdAndDelete({ _id: commentId })
    .save()
    .then((deletedComment) => {
      return res.status(200).json({
        message: "Comment deleted!",
        data: deletedComment,
      });
    })
    .catch((error) => {
      if (error)
        return res.status(500).json({
          message: "Could not delete comment",
          error: error,
        });
    });
};
