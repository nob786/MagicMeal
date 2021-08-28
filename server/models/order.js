const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
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
    customerAddress: {
      type: String,
      required: true,
    },
  },
  restaurant: {
    restaurantName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  /*date: {
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  type: {
    type: String,
    enum: ["delivery","takeaway"],
    required: true,
  },*/
  items: [
     {
      itemName: { type: String, required: true },
      price: {type: Number, required: true},
      quantity: { type: Number, required: true },
      total: {type: Number, required: true},
    },
  ],
  grandTotal: {type: Number, required: true},
  status: {
    type: String,
    enum: ["pending", "rejected","cancelled","accepted","received"],
    required: true,
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
