const mongoose = require("mongoose");
// const addressInfo = {
//   lat: Number,
//   lng: Number,
// };
//R
const restaurantSchema = mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: String },
    lng: { type: String },
  },
  dineIn: {
    type: Boolean,
    default: true,
  },
  pickUp: {
    type: Boolean,
    default: true,
  },

  bookTable: {
    type: Boolean,
    default: true,
  },
  ActiveStatus: {
    type: Boolean,
    default: true,
  },

  items: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Items" },
  ],

  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
});

// Restaurant orders virutals
restaurantSchema.virtual("orders", {
  ref: "Orders",
  localField: "_id",
  foreignField: "restaurant.restauranId",
});

// Restaurant booking virtuals
restaurantSchema.virtual("bookings", {
  ref: "Bookings",
  localField: "_id",
  foreignField: "restauranId",
});

//Restaurant has comments
restaurantSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "restaurant.restaurantId",
});

restaurantSchema.set("toObject", { virtuals: true });
restaurantSchema.set("toJSON", { virtuals: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

exports.Restaurant = Restaurant;
