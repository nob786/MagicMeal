const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  tableNo: {
    type: Number,
  },

  numberOfPersons: {
    type: Number,
    required: true,
  },

  reservationDate: {
    type: Date,
    required: true,
  },

  reservationTime: {
    type: String,
    required: true,
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
  restaurant: {
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
  },
  reservationStatus: {
    type: String,
    enum: ["pending", "cancelled", "accepted"],
    required: true,
  },
});

const Bookings = mongoose.model("Bookings", bookingSchema);
exports.Bookings = Bookings;
