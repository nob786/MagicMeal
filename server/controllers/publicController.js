const mongoose = require("mongoose");
const { Comments } = require("../models/comments");

exports.getComments = async (req, res) => {
  try {
    const comment = await Comments.find();

    if (!restaurants) return res.status(404).send("No restaurant found.");
    return res.status(200).json({
      message: "These are all the restaurants in database.",
      data: restaurants,
    });
  } catch (error) {
    if (error)
      return res.status(500).json({
        message: "Server Error",
        error: error,
      });
  }
};
