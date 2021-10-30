const mongoose = require("mongoose");

const newsletterSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const Newsletters = mongoose.model("Newsletters", newsletterSchema);

exports.Newsletters = Newsletters;
