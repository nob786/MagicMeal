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
  comment: {
    type: String,
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

exports.Comments = Comments;
