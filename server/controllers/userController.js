const { Restaurant } = require("../models/restaurant");
const { Comments } = require("../models/comments");
const { Customer } = require("../models/customer");
const { Bookings } = require("../models/booking");
const { Account } = require("../models/account");
const { Orders } = require("../models/order");
// const { validateComment } = require("../middleware/validation");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");
require("dotenv").config();
const mongoose = require("mongoose");

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
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
  await emailTransporter.sendMail(mailOptions);
};

// API for fetching reservation table
exports.getReservedTables = async (req, res) => {
  console.log("Inside get reserved table api");
  const customerId = req.params.customerId;
  //_____________________________________________//
  console.log("Customer in params", req.params);
  console.log("CustomerId variable", customerId);
  //_____________________________________________//
  if (!customerId) {
    console.log("Could not find customer id");
    return res.json({
      message: "Could not find customer id",
    });
  }

  const query = { "customer.customerId": customerId };
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

// API for fetching restauranta
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    console.log("Inside Get Restaurants");

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

// API for fetching restaurant menu items
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

// API fetching updated orders
exports.getUpdatedOrder = async (req, res) => {
  const customerId = req.params.customerId;
  console.log("customer id", customerId);
  if (!customerId)
    return res.status(404).send("No restaurant ID found in params");

  const query = { "customer.customerId": customerId };
  await Orders.find(query)
    .then((response) => {
      console.log("Printing response inside API function", response);

      if (!response)
        return res.status(404).send("No order found with this id.");
      return res.status(200).json({
        message: "Retrieved Order",
        updatedOrder: response,
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

// API for posting order
exports.postOrder = async (req, res) => {
  console.log("Order Data", req.body);
  const {
    restaurantData,
    customerData,
    items,
    grandTotal,
    orderDate,
    orderType,
    tableNumber,
  } = req.body;
  const restaurantId = req.params.restId;
  const userId = req.loggedInUserId;

  console.log("User Id", userId);
  console.log("Rest Id", restaurantId);

  const itemsArray = items.map((i) => {
    return {
      itemId: i._id,
      itemName: i.itemName,
      itemDescription: i.description,
      price: i.price,
      quantity: i.quantity,
      total: i.total,
    };
  });

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
  const email = customerAccount.email;
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

  if (restaurant.ActiveStatus === false) {
    return res.status(400).json({
      message: "Restauarant is Currently Offline",
      // data: restaurant,
    });
  }
  if (orderType === "dinein") {
    if (restaurant.dineIn === false) {
      return res.status(400).json({
        message: "Restauarant has Disabled Dine In Services",
        data: restaurant,
      });
    }
  }
  if (orderType === "pickup") {
    if (restaurant.pickUp === false) {
      return res.status(400).json({
        message: "Restauarant has Disabled PickUp Services",
        data: restaurant,
      });
    }
  }

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
      restaurantId: restaurantData.restaurantId,
    },
    items: itemsArray,
    grandTotal: grandTotal,
    status: "pending",
    orderDate: orderDate,
    orderType: orderType,
    tableNumber: tableNumber,
    estimatedReadyTime: null,
  });

  console.log("This is your order", newOrder);

  await newOrder
    .save()
    .then((data) => {
      console.log("Data", data);
      const mailOptions = {
        to: email,
        from: "Eatsabyte@gmail.com",
        subject: "Order Placed",
        html: `<p>Dear customer your order has been placed  - Eatsabyte</p>
        `,
      };

      sendEmail(mailOptions);

      return res.status(200).json({
        message: "Order saved",
        data: data,
      });
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({
          messsage: "Could not send back response",
          error: error,
        });
      } else {
        return res.status(500).json({
          message: "Server Error",
        });
      }
    });
};

// async function averageRating(restaurantId) {
//   let comments = await Comments.find({
//     "restaurant.restaurantId": restaurantId,
//   });
//   let review = 0;

//   if (!comments)
//     return res.status(404).json({
//       message: "Could not find any collection of comments.",
//     });

//   console.log("COmments", comments);
//   console.log("COmments length", comments.length);
//   let counter = comments.length;
//   console.log("This is no of comments", counter);

//   // let returnedReview =
//   comments.map((comment) => {
//     review = review + comment.rating;
//     // return review;
//   });

//   console.log("This is your returned review", review);
//   const myReviewObject = { review: review, counter: counter };
//   console.log("Returning this object", myReviewObject);
//   return myReviewObject;
// }

// exports.postComment = async (req, res) => {
//   //console.log("Comment api called.");
//   console.log("Comment Body", req.body);

//   const userId = req.loggedInUserId;
//   // const restaurantId = req.restId;
//   // console.log("Rest Id", req.params.restId); //req.params.restId;
//   // const { error } = validateComment(req.body);

//   // if (error)
//   //   return res.status(400).json({
//   //     message: "Error. Enter Data correctly ",
//   //     error: error,
//   //   });

//   const { comment, rating, restaurantId, date, orderId } = req.body;
//   // let isSubmitted = false;

//   if (!userId) {
//     return res.status(404).send("User id not found.");
//   }
//   if (!restaurantId) {
//     return res.status(404).send("Restaurant id not found");
//   }
//   if (!orderId) {
//     return res.status(404).send("Order id not found");
//   }

//   const customerAccount = await Account.findById(userId);
//   if (!customerAccount)
//     return res.status(404).send("Customer nor found in database.");

//   const customer = await Customer.findOne({
//     account: customerAccount._id,
//   });
//   if (!customer) return res.status(404).send("Did not find customer object");

//   // const restaurantAccount = await Account.findById(restaurantId);
//   // if (!restaurantAccount)
//   //   return res.status(404).send("Restaurant account not found");

//   const restaurant = await Restaurant.findById(restaurantId);
//   console.log("This is the restaurant", restaurant);

//   if (!restaurant)
//     return res.status(404).send("Did not find restaurant object.");

//   const order = await Orders.findById(orderId);
//   if (!order) return res.status(404).send("Did not find any order");

//   let newComment = new Comments({
//     customer: {
//       name: customer.firstName + " " + customer.lastName,
//       customerId: customer._id,
//     },
//     restaurant: {
//       name: restaurant.restaurantName,
//       restaurantId: restaurant._id,
//     },
//     comment: comment,
//     rating: rating,
//     orderId: orderId,
//     // isSubmitted: true,
//     date: date,
//   });

//   console.log("New Comment Created", newComment);

//   if (order.isReviewSubmitted === true)
//     return res.status(400).json({
//       message: "Review is already submitted for this order",
//     });

//   await newComment
//     .save()
//     .then((data) => {
//       order.isReviewSubmitted = true;
//       order.save();
//       let newRating = averageRating(restaurantId);
//       return res.status(200).json({
//         message: "Comment successful",
//         data: data,
//         rating: newRating,
//       });
//     })
//     .catch((error) => {
//       if (error)
//         res.status(500).json({
//           message: "Could not save comment to database",
//           error: error,
//         });
//     });
// };

async function averageRating(restaurantId) {
  let comments = await Comments.find({
    "restaurant.restaurantId": restaurantId,
  });
  let review = 0;

  if (!comments)
    return res.status(404).json({
      message: "Could not find any collection of comments.",
    });

  // console.log("COmments", comments);
  // console.log("COmments length", comments.length);
  let counter = comments.length;
  // console.log("This is no of comments", counter);

  // let returnedReview =
  comments.map((comment) => {
    review = review + comment.rating;
    // return review;
  });

  // console.log("This is your returned review", review);
  const myReviewObject = { review: review, counter: counter };
  console.log("Returning this object of rating", myReviewObject);
  // return myReviewObject;

  //
  let update = {
    rating: review,
    totalRating: counter,
  };

  await Restaurant.findOneAndUpdate(restaurantId, update, {
    useFindAndModify: false,
  })
    .then((response) => {
      console.log("Rating updated", response);
    })
    .catch((err) => {
      if (err) {
        console.log("Error rating update");
      } else {
        console.log("Server Error");
        return res.status(500).json({
          message: "Server Error",
        });
      }
    });
}

// API for posting comments
exports.postComment = async (req, res) => {
  //console.log("Comment api called.");
  console.log("Comment Body", req.body);

  const userId = req.loggedInUserId;
  // const restaurantId = req.restId;
  // console.log("Rest Id", req.params.restId); //req.params.restId;
  // const { error } = validateComment(req.body);

  // if (error)
  //   return res.status(400).json({
  //     message: "Error. Enter Data correctly ",
  //     error: error,
  //   });

  const { comment, rating, restaurantId, date, orderId } = req.body;
  // let isSubmitted = false;

  if (!userId) {
    return res.status(404).send("User id not found.");
  }
  if (!restaurantId) {
    return res.status(404).send("Restaurant id not found");
  }
  if (!orderId) {
    return res.status(404).send("Order id not found");
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

  const order = await Orders.findById(orderId);
  if (!order) return res.status(404).send("Did not find any order");

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
    rating: rating,
    orderId: orderId,
    // isSubmitted: true,
    date: date,
  });

  console.log("New Comment Created", newComment);

  if (order.isReviewSubmitted === true)
    return res.status(400).json({
      message: "Review is already submitted for this order",
    });

  await newComment
    .save()
    .then((data) => {
      order.isReviewSubmitted = true;
      order.save();
      let newRating = averageRating(restaurantId);
      console.log("Rating in post comment", newRating);
      return res.status(200).json({
        message: "Comment successful",
        data: data,
        // rating: newRating,
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

// API for deleting comments
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

// API for fetching comments
exports.getComments = async (req, res) => {
  const { restId } = req.params;
  if (!restId)
    return res.status(404).json({
      message: "There is no restaurant id",
    });

  const requestObject = { "restaurant.restaurantId": restId };
  await Comments.find(requestObject)
    .sort({ date: -1 })
    .then((comments) => {
      if (comments)
        return res.status(200).json({
          message: "Got all comments",
          comments: comments,
        });
    })
    .catch((error) => {
      if (error) {
        return res.status(400).json({
          message: "Error in catch block",
        });
      } else {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
    });
};

// API for fetching restaurants by address
exports.getRestaurantsByAddress = async (req, res, next) => {
  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // console.log(
  //   "distance get before",
  //   getDistance(30.192876, 71.518992, 30.184318, 71.511799)
  // );

  console.log("getRestaurantsByAddress API called");

  let { lat1, lon1 } = req.body;
  console.log("Got lat1 lon1", req.body);

  let ac = await Account.find();
  console.log("===============>Account pre filtered", ac);
  const filteredAccounts = ac.filter((n) => {
    if (n.isVerified === true && n.role === "restaurant") return n;
  });

  // console.log(
  //   "-=========================>Is Verified Accounts",
  //   filteredAccounts
  // );

  const finalRestaurants = await Restaurant.find();

  // console.log(
  //   "=============================>Filtered Restaurants",
  //   finalRestaurants
  // );

  const nearbyRestaurants = finalRestaurants.filter((n) => {
    if (n.location.lat !== null && n.location.lng !== null) {
      console.log(
        "Distance We Get",
        getDistance(lat1, lon1, n.location.lat, n.location.lng)
      );
      if (getDistance(lat1, lon1, n.location.lat, n.location.lng) <= 15) {
        n.tempDistance = getDistance(
          lat1,
          lon1,
          n.location.lat,
          n.location.lng
        );
        return n;
      }
    }
  });

  console.log(
    "===============================>Nearby REstaurants",
    nearbyRestaurants
  );

  return res.status(200).json({
    message: "These are all the restaurants Nearby.",
    data: nearbyRestaurants,
  });
};

// API for reserving table
exports.bookTable = async (req, res) => {
  const {
    numberOfPersons,
    reservationDate,
    reservationTime,
    customer,
    restaurant,

    // reservationStatus,
  } = req.body;

  console.log("Customer Previous", customer.customerId);
  // const customerAccount = await Account.findById(customer.customerId);
  const customerData = await Customer.findById(customer.customerId);

  // if (customerData) {
  //   console.log("Customer Account", customerData);
  // } else {
  //   console.log("Customer Account Not Found");
  //   return res.status(404).send("Customer Not Found");
  // }

  // console.log("Customer Account",customerAccount);
  const restaurantFound = await Restaurant.findById(
    restaurant.restaurantId
    // account: restaurantAccount._id,
  );
  //console.log(restaurant);
  if (!restaurantFound)
    return res.status(404).json({
      message: "Could not find the restaurant",
      data: restaurantFound,
    });
  if (restaurantFound.ActiveStatus === false) {
    return res.status(400).json({
      message: "Restauarant is Currently Offline",
      // data: restaurant,
    });
  }
  if (restaurantFound.bookTable === false) {
    return res.status(400).json({
      message: "Restauarant has Disabled Table Bookings",
      // data: restaurant,
    });
  }

  if (customerData.activeTableBookings < customerData.maxOrders) {
    // console.log("Max Bookings Limit Reached");

    if (
      // tableNo &&
      numberOfPersons &&
      reservationDate &&
      reservationTime &&
      customer &&
      restaurant
    ) {
      const booking = new Bookings({
        tableNo: null,
        numberOfPersons: numberOfPersons,
        reservationDate: reservationDate,
        reservationTime: reservationTime,
        customer: {
          customerName: customer.customerName,
          customerId: customer.customerId,
        },
        restaurant: {
          restaurantName: restaurant.restaurantName,
          restaurantId: restaurant.restaurantId,
        },
        reservationStatus: "pending",
      });

      await booking
        .save()
        .then((data) => {
          console.log("Data", data);
          customerData.activeTableBookings += 1;
          customerData
            .save()
            .then((res) => {
              console.log("Data Incremented");
            })
            .catch((err) => {
              console.log("Data not Incremented");
            });
          return res.status(200).json({
            message: "Booking request placed",
            data: data,
          });
        })
        .catch((error) => {
          if (error) {
            return res.status(400).json({
              message: "Check your request",
              error: error,
            });
          } else {
            console.log("Server Error");
            return res.status(500).json({
              message: "Server Error",
            });
          }
        });
    } else {
      console.log("Data is faulty", req.body);
      return res.status(400).json({
        message: "Data is faulty",
        error: req.body,
      });
    }
  } else if (customerData.activeTableBookings === customerData.maxOrders) {
    console.log("Max Booking Limit Reached", customerData);
    return res.status(400).json({
      message: "Max booking reached",
    });
  }
};
