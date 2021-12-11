const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  activeTableBookings: {
    type: Number,
    default: 0,
  },
  activePickupOrders: {
    type: Number,
    default: 0,
  },
  activeDineInOrders: {
    type: Number,
    default: 0,
  },
  maxOrders: {
    type: Number,
    default: 1,
  },
});

// Customer has order virtuals
customerSchema.virtual("orders", {
  ref: "Orders",
  localField: "_id",
  foreignField: "customer.customerId",
});

// Customer has booking virtuals
customerSchema.virtual("bookings", {
  ref: "Bookings",
  localField: "_id",
  foreignField: "customer.customerId",
});

//Customer has comments
customerSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "customer.customerId",
});

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });

const Customer = mongoose.model("Customer", customerSchema);
exports.Customer = Customer;
