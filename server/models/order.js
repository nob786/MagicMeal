const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  items: [
    {
      item: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  customer: {
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

orderSchema.virtual("booking", {
  ref: "Booking",
  localField: "_id",
  foreignField: "orderId",
});

orderSchema.set("toObject", { virtual: true });
orderSchema.set("toJSON", { virtual: true });

const Orders = mongoose.model("Orders", orderSchema);

exports.Orders = Orders;
