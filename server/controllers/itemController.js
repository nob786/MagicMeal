const { Restaurant } = require("../models/restaurant");
const { Account } = require("../models/account");
const { Items } = require("../models/item");
const { Orders } = require("../models/order");
const { Comments } = require("../models/comments");
const { Bookings } = require("../models/booking");
const { Customer } = require("../models/customer");
const { validateItem } = require("../middleware/validation");
const { google } = require("googleapis");
const { bool } = require("joi");
const OAuth2 = google.auth.OAuth2;

//_______________________ Email Configurations ______________________________________\\

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  // console.log("This is oauth2Client before setting credentials", oauth2Client);

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  // console.log("This is oauth2Client after setting credentials", oauth2Client);

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to crete access token");
        console.log("Error in promise");
        console.log("Token", token);
      }
      resolve(token);
    });
  });

  // console.log("Access Token", accessToken);

  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_URL,
    // port: 587,
    // secure: "false",
    // auth: {
    //   user: process.env.SMTP_USER,
    //   pass: process.env.SMTP_PASS,
    // },
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,

      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (mailOptions) => {
  let emailTransporter = await createTransporter();
  // console.log("Email Transporter", emailTransporter);
  await emailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(`mail sent ${info.response}`);
    }
  });
};

// ___________________________________________________________________________________\\

exports.uploadRestaurantImage = async (req, res) => {
  console.log("Inside upload image function");
  const { imageUrl } = req.body;
  if (imageUrl) {
    console.log("Found image");
  } else {
    console.log("Did not get image");
    return res.json({
      message: "Did not get image",
    });
  }

  let query = {
    account: req.loggedInUserId,
  };

  let update = {
    imageUrl: imageUrl,
  };

  await Restaurant.findOneAndUpdate(query, update)
    .then((response) => {
      console.log("Image Uploaded");
      return res.status(200).json({
        messgae: "Image Uploaded",
        response: response,
      });
    })
    .catch((err) => {
      if (err) {
        console.log("Error in catch block");
        return res.status(400).json({
          message: "Error in catch block",
          error: err,
        });
      } else {
        console.log("Server Error");
        return res.status(500).json({
          message: "Server Error",
        });
      }
    });
};

//_______________________________________________________________________________________\\
// API for updating reservation status
exports.updateReservationTableStatus = async (req, res) => {
  console.log("Inside restaurant update reservation status api");
  const { tableNumber, reservationStatus, reservationId, customerId } =
    req.body;
  if (!tableNumber && !reservationStatus && !reservationId && !customerId) {
    console.log("Did not get required parameters for finding bookings");
    return res.json({
      message: "Did not get required parameters for finding bookings",
    });
  }
  const query = {
    // "restaurant.restaurantId": restaurantId,
    // "customer.customerId": customerId,
    _id: reservationId,
  };

  let update = null;
  if (reservationStatus === "reserved") {
    update = {
      reservationStatus: reservationStatus,
      tableNumber: tableNumber,
    };
  } else {
    update = { reservationStatus: reservationStatus };
  }

  let booking = await Bookings.findOneAndUpdate(query, update, {
    useFindAndModify: false,
  });

  if (booking) {
    if (reservationStatus === "free" || reservationStatus === "cancelled") {
      let customerData = await Customer.findById(customerId);
      if (customerData) {
        customerData.activeTableBookings -= 1;
        customerData.save();
      } else {
        console.log(
          "Could not find customer id for updating active Table bookings data"
        );
      }
    }

    console.log("Booking updated", booking);
    // const mailOptions = {
    //   to: email,
    //   from: "Magic Meal",
    //   subject: "Booking Status",
    //   html: `<p>Dear Customer your table has been reserved. Your table no is ${tableNumber} </p>`,
    // };
    // sendEmail(mailOptions);
    return res.status(200).json({
      message: "Bookings status updated",
      data: booking,
    });
  } else {
    return res.status(400).json({
      message: "Could not update status",
    });
  }
};

// API for fetching reserved tables
exports.getReservedTables = async (req, res) => {
  console.log("Inside restaurant get reservation api");
  const restaurantId = req.params.restaurantId;
  //_____________________________________________//
  console.log("Restaurant in params", req.params);
  console.log("RestaurantId variable", restaurantId);
  //_____________________________________________//
  if (!restaurantId) {
    console.log("Could not find restaurant id");
    return res.json({
      message: "Could not find restaurant id",
    });
  }

  const query = { "restaurant.restaurantId": restaurantId };
  await Bookings.find(query)
    .then((response) => {
      if (response) {
        console.log("Found your reservations", response);
        return res.status(200).json({
          message: "Found your reservation",
          reservations: response,
        });
      }
    })
    .catch((error) => {
      if (error) {
        console.log("We are in catch block due to some unforseen error");
        return res.status(400).json({
          message: "Unknown error possibly in code",
          err: error,
        });
      } else {
        console.log("Server error");
        return res.status(500).json({
          message: "Server Error",
        });
      }
    });
};

// API for adding menu items
exports.addItem = async (req, res) => {
  const { error } = validateItem(req.body);

  if (error) return res.status(400).send("Enter data  correctly.");

  const { itemName, price, category, description, imageUrl } = req.body;
  // const { path } = req.file;
  // console.log("Path of image", path);

  let restaurant = await Restaurant.findOne({
    account: req.loggedInUserId,
  });
  console.log("This is the restaurant we found", restaurant);

  try {
    if (!restaurant)
      return res.status(404).json({
        message: "No restaurant exists with this id",
        restaurant: restaurant,
        restId: req.loggedInUserId,
      });

    let newItem = new Items({
      itemName: itemName,
      price: price,
      category: category,
      description: description,
      imageUrl: imageUrl,
      restaurant: restaurant._id,
    });
    console.log("Item obj", newItem);

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

// API for deleteing menu items
exports.deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  console.log(req.params);
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

    await Items.findByIdAndDelete(itemId).then((response) => {
      if (response) return res.status(200).send("Item Deleted");
    });
    // let restaurant = Restaurant.findByIdAndUpdate(restaurantId, {
    //   $pull: { items: { $in: [`${itemId}`] } },
    // });
    // await restaurant.save();
  } catch (error) {
    if (error) return res.status(400).send(error);
  }
};

// API for updating menu items
exports.updateItem = async (req, res) => {
  const itemId = req.params.itemId;

  if (!itemId)
    return res.status(404).json({
      message: "Could not find item id",
      itemId: itemId,
    });

  const { itemName, price, category, description, imageUrl } = req.body;

  try {
    if (!itemId)
      return res
        .status(404)
        .send("There was no item id found in the request body.");

    let item = await Items.findById(itemId);
    item.itemName = itemName;
    item.price = price;
    item.category = category;
    item.description = description;
    item.imageUrl = imageUrl;
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

// API for fetching menu items
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
      return res.status(200).send({ data: items });
    }
  } catch (error) {
    if (error)
      return res.status(400).json({
        message: "Could not get your items",
        error: error,
      });
  }
};

// API for fetching single menu items
exports.getItem = async (req, res) => {
  const itemId = req.params.itemId;
  console.log("Item id", itemId);
  if (!itemId) return res.status(400).send("No user id found in params");

  try {
    let item = await Items.findById(itemId);
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

// API for fetching pending orders
exports.getPendingOrders = async (req, res) => {
  const restId = req.params.restId;
  console.log("restaurant id", restId);
  if (!restId) return res.status(404).send("No restaurant ID found in params");

  const query = { grandTotal: 600 };
  const query1 = { "restaurant.restaurantId": restId };
  await Orders.find(query1)
    .then((response) => {
      console.log("Printing response inside API function", response);

      if (!response)
        return res.status(404).send("No order found with this id.");
      return res.status(200).json({
        message: "Found all pending orders",
        pendingOrders: response,
      });
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({
          message: "Error in catch block",
          error: error,
        });
      } else {
        return res.status(500).send("Server Error");
      }
    });
};

// API for updating pending order status
exports.updatePendingOrders = async (req, res) => {
  //const restId = req.params.restId;
  const { orderId, status, estimatedReadyTime } = req.body;
  //console.log("restaurant id", restId);
  //if (!restId) return res.status(404).send("No restaurant ID found in params");
  const query1 = {
    //"restaurant.restaurantId": restId,
    _id: orderId,
  };

  let update = null;
  if (status === "accepted") {
    update = { status: status, estimatedReadyTime: estimatedReadyTime };
  } else {
    update = { status: status };
  }

  console.log("Estimated time", update);

  await Orders.findOneAndUpdate(query1, update)
    .then((response) => {
      // const mailOptions = {
      //   to: email,
      //   from: "Magic Meal",
      //   subject: "Order Status",
      //   html: `<p> Your order has been placed. This is your order id ${orderId}. Your meal will be ready in ${estimatedReadyTime}.`,
      // };
      // console.log(
      //   "Printing response inside Update Pending order api",
      //   response
      // );
      // sendEmail(mailOptions);

      return res.status(200).json({
        messgae: "Order Updated Successfully",
        updatedOrder: response,
      });
    })
    .catch((error) => {
      if (error)
        return res.status(400).json({
          message: "Catch error",
          error: error,
        });
      else {
        return res.status(500).send("Server Error");
      }
    });
};

// API for updating Location order status
exports.uploadLocation = async (req, res) => {
  const { lat, lng, address } = req.body;

  console.log("lat", lat);
  console.log("address", address);
  console.log("lng", lng);

  if (!lat || !lng) {
    console.log("Lat and lng are empty");
    return res.json({
      message: "Lat and lng are empty",
    });
  }

  const query = {
    account: req.loggedInUserId,
  };

  const update = {
    location: {
      lat: lat,
      lng: lng,
      address: address,
    },
  };
  await Restaurant.findOneAndUpdate(query, update)
    .then((response) => {
      if (response) {
        console.log("Location Updated");
        return res.json({
          message: "Location Updated",
        });
      }
    })
    .catch((err) => {
      if (err) {
        console.log("This is err in catch", err);
        return res.json({
          message: "Err in catch",
          error: err,
        });
      } else {
        console.log("Server error");
        return res.json({
          message: "Server Error",
        });
      }
    });
};

// API for fetching restaurant data
exports.getRestaurantData = async (req, res) => {
  console.log("Inside Get restaurant data API");
  Account.findOne({ _id: req.loggedInUserId })
    .then(async (account) => {
      const email = account.email;

      if (!email)
        return res.status(404).json({
          message: "Email not found",
        });

      console.log("This is restaurants email", email);

      let restaurant = await Restaurant.findOne({
        account: req.loggedInUserId,
      });

      if (!restaurant)
        return res.status(404).json({
          message: "Restaurant not found",
        });

      restaurant.tempEmail = email;
      restaurant.save();

      return res
        .status(200)
        .json({ message: "Data fetched Successful", restaurant: restaurant });
    })
    .catch((error) => {
      if (error)
        return res.json({
          message: "Error in catch",
          error: error,
        });
      else
        return res.status(500).json({
          message: "Server Error",
        });
    });
};

// API for fetching comments stats
exports.getRestaurantCommentStats = async (req, res) => {
  console.log("Inside get restaurant comment stats APi");
  let finalOrders = [];
  let totalRatings = 0;
  let positiveRatings = [];
  let negativeRatings = [];
  await Restaurant.findOne({ account: req.loggedInUserId })
    .then(async (restaurant) => {
      // console.log("Inside restaurant find one");
      const { _id } = restaurant._id;
      // console.log("Restaurant Id", _id);
      if (!_id)
        return res.status(404).json({
          message: "Could not find restaurant id",
        });

      await Comments.find({ "restaurant.restaurantId": _id }).then(
        (comments) => {
          console.log("Inside Comments");
          totalRatings = comments.length;
          // console.log("Length of comments", totalRatings);
          comments.map((commentsObject) => {
            if (commentsObject.rating > 0 && commentsObject.rating < 3) {
              negativeRatings.push(commentsObject);
              // console.log("Neg");
            }
            if (commentsObject.rating >= 3) {
              positiveRatings.push(commentsObject);
              // console.log("pos");
            }
          });
          // console.log("neg", negativeRatings);
        }
      );

      await Orders.find({ "restaurant.restaurantId": _id }).then((orders) => {
        console.log("Inside orders find");
        orders.map((deliveredOrders) => {
          // console.log("Inside order map", deliveredOrders);
          if (deliveredOrders.status === "delivered") {
            finalOrders.push(deliveredOrders);
          }
        });
      });

      // console.log("After orders find", finalOrders.length);
      // console.log("Total Ratings", totalRatings);
      // console.log("Positive Ratings", positiveRatings.length);
      // console.log("Negative Ratings", negativeRatings.length);

      if (!finalOrders)
        return res.status(400).json({
          message: "Empty Orders",
        });
      return res.status(200).json({
        message: "Got all orders",
        noOfDeliverOrders: finalOrders.length,
        totalRatings: totalRatings,
        noOfPositiveRatings: positiveRatings.length,
        noOfNegativeRatings: negativeRatings.length,
      });
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({
          message: "Error in catch block",
          error: error,
        });
      } else {
        return res.status(500).json({
          message: "Internal Server error",
        });
      }
    });
};

// API for fetching customer stats
exports.getRestaurantStats = async (req, res) => {
  await Restaurant.findOne({ account: req.loggedInUserId })
    .then(async (restaurant) => {
      let customerIds = [];
      let finalOrders = [];
      let totalRatings = 0;
      let positiveRatings = [];
      let negativeRatings = [];
      let noOfMenus;
      let allComments;
      let sales = new Array();
      monthlySaleOfJan = 0;
      monthlySaleOfFeb = 0;
      monthlySaleOfMar = 0;
      monthlySaleOfApr = 0;
      monthlySaleOfMay = 0;
      monthlySaleOfJun = 0;
      monthlySaleOfJul = 0;
      monthlySaleOfAug = 0;
      monthlySaleOfSep = 0;
      monthlySaleOfOct = 0;
      monthlySaleOfNov = 0;
      monthlySaleOfDec = 0;
      const { _id } = restaurant._id;
      // console.log("Restaurant Id", _id);

      if (!restaurant)
        return res.status(404).json({
          message: "Restaurant not found",
        });

      await Comments.find({ "restaurant.restaurantId": _id }).then(
        (comments) => {
          console.log("Inside Comments");
          totalRatings = comments.length;
          // console.log("Length of comments", totalRatings);
          comments.map((commentsObject) => {
            if (commentsObject.rating > 0 && commentsObject.rating < 3) {
              negativeRatings.push(commentsObject);
              // console.log("Neg");
            }
            if (commentsObject.rating >= 3) {
              positiveRatings.push(commentsObject);
              // console.log("pos");
            }
          });
          // console.log("neg", negativeRatings);
          allComments = comments;
        }
      );

      // await Orders.aggregate([{$match : {
      //   restaurant: restaurant._id

      // }}])
      await Orders.find({
        "restaurant.restaurantId": restaurant._id,
      })
        .then((orders) => {
          if (!orders) {
            return res.status(404).json({
              message: "Orders not found",
            });
          }
          // console.log("Or", orders);

          orders.map((allOrders) => {
            // let month = parseInt(allOrders.orderDate.substring(5, 6));
            let date = allOrders.orderDate.toString();
            let month = date.substring(4, 7);
            // console.log("d", month);
            // console.log("nDa", newDate);

            customerIds.push(allOrders.customer.customerId);
            if (allOrders.status === "delivered") {
              finalOrders.push(allOrders);
            }
            // console.log("s");

            if (month === "Jan") {
              // monthlySaleOfJan = 0;
              monthlySaleOfJan = monthlySaleOfJan + allOrders.grandTotal;
              console.log("mon", monthlySaleOfJan);
              // console.log("jans", monthlySaleOfJan);
              sales[0] = monthlySaleOfJan;
            }
            if (month === "Feb") {
              // monthlySaleOfFeb = 0;
              monthlySaleOfFeb = monthlySaleOfFeb + allOrders.grandTotal;
              sales[1] = monthlySaleOfFeb;
            }
            if (month === "Mar") {
              // monthlySaleOfMar = 0;
              monthlySaleOfMar = monthlySaleOfMar + allOrders.grandTotal;
              sales[2] = monthlySaleOfMar;
            }
            if (month === "Apr") {
              // monthlySaleOfApr = 0;
              monthlySaleOfApr = monthlySaleOfApr + allOrders.grandTotal;
              sales[3] = monthlySaleOfApr;
            }
            if (month === "May") {
              // monthlySaleOfMay = 0;
              monthlySaleOfMay = monthlySaleOfMay + allOrders.grandTotal;
              sales[4] = monthlySaleOfMay;
            }
            if (month === "Jun") {
              // monthlySaleOfJune = 0;
              monthlySaleOfJune = monthlySaleOfJune + allOrders.grandTotal;
              sales[5] = monthlySaleOfJun;
            }
            if (month === "Jul") {
              // monthlySaleOfJuly = 0;
              monthlySaleOfJuly = monthlySaleOfJuly + allOrders.grandTotal;
              sales[6] = monthlySaleOfJul;
            }
            if (month === "Aug") {
              // monthlySaleOfAug = 0;
              monthlySaleOfAug = monthlySaleOfAug + allOrders.grandTotal;
              sales[7] = monthlySaleOfAug;
            }
            if (month === "Sep") {
              // monthlySaleOfSep = 0;
              monthlySaleOfSep = monthlySaleOfSep + allOrders.grandTotal;
              sales[8] = monthlySaleOfSep;
            }
            if (month === "Oct") {
              // monthlySaleOfOct = 0;
              monthlySaleOfOct = monthlySaleOfOct + allOrders.grandTotal;
              sales[9] = monthlySaleOfOct;
            }
            if (month === "Nov") {
              // monthlySaleOfNov = 0;
              monthlySaleOfNov = monthlySaleOfNov + allOrders.grandTotal;
              sales[10] = monthlySaleOfNov;
            }
            if (month === "Dec") {
              // monthlySaleOfDec = 0;
              monthlySaleOfDec = monthlySaleOfDec + allOrders.grandTotal;
              sales[11] = monthlySaleOfDec;
            }
          });
          console.log("Sales", sales);
        })
        .catch((error) => {
          if (error) {
            return res.status(400).json({
              message: "Error in Orders",
            });
          }
        });

      await Items.find({ restaurant: restaurant._id }).then((items) => {
        if (!items) {
          return res.status(404).json({
            message: "Items not found",
          });
        }
        noOfMenus = items.length;
      });

      return res.status(200).json({
        message: "Got your stats",
        noOfUniqueCustomers: customerIds.length,
        noOfDeliverOrders: finalOrders.length,
        totalRatings: totalRatings,
        noOfPositiveRatings: positiveRatings.length,
        noOfNegativeRatings: negativeRatings.length,
        noOfMenus: noOfMenus,
        commentData: allComments,
        salesData: sales,
      });
    })
    .catch((error) => {
      if (error) {
        res.status(400).json({
          message: "Error in catch",
          error: error,
        });
      } else {
        res.statu(500).json({
          message: "Internal Server Error",
        });
      }
    });
};

exports.updateStatus = async (req, res) => {
  let { name, booleanValue } = req.body;

  if (!name || !booleanValue)
    return res.status(200).json({
      message: "Data is empty",
    });

  console.log("Name value", name);
  console.log("Boolean Value", booleanValue);

  try {
    let restaurant = await Restaurant.findOne({ account: req.loggedInUserId });
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    if (name === "activestatus") {
      restaurant.ActiveStatus = booleanValue;
      await restaurant.save();
      return res.status(200).json({
        message: "Restaurant Active Status changed to" + " " + booleanValue,
        data: booleanValue,
      });
    }

    if (name === "dinein") {
      restaurant.dineIn = booleanValue;
      await restaurant.save();
      return res.status(200).json({
        message: "Restaurant Dine-In Service changed to" + " " + booleanValue,
        data: booleanValue,
      });
    }

    if (name === "pickup") {
      restaurant.pickUp = booleanValue;
      await restaurant.save();
      return res.status(200).json({
        message: "Restaurant Pick-Up Service changed to" + " " + booleanValue,
        data: booleanValue,
      });
    }

    if (name === "booktable") {
      restaurant.bookTable = booleanValue;
      await restaurant.save();
      return res.status(200).json({
        message:
          "Restaurant Book Table Service changed to" + " " + booleanValue,
        data: booleanValue,
      });
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        message: "Unknown Error",
        error: error,
      });
    } else {
      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
};
