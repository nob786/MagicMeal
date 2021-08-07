const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
  },
  tableStatus: {
    type: String,
    enum: ["Booked", "Available"],
  },
  availableTables: {
    type: Number,
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
  customer: {
    customerName: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
});

const Bookings = mongoose.model("Bookings", bookingSchema);
module.exports = Bookings;
