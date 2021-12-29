const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  customer: {
    name: {
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
    name: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  // isSubmitted: {
  //   type: Boolean,
  //   default: false,
  // },
  date: {
    type: Date,
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

exports.Comments = Comments;
