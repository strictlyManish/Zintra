const mongoose = require("mongoose");

const BlackList = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "7d",
    },
  },
  { timestamps: true },
);

const BlackListModel = mongoose.model("BlackListed_token", BlackList);

module.exports = BlackListModel;
