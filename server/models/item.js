const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  itemImage: String,

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
});

const Items = mongoose.model("Items", itemsSchema);

exports.Items = Items;
