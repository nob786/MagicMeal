const mongoose = require("mongoose");
const orederSchema = mongoose.Schema({
  items: [
    {
      item: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  customerId: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  restaurant: {
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
});

const Orders = mongoose.model("Orders", orederSchema);

exports.Orders = Orders;
