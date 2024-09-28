const mongoose = require("mongoose");

const savedGameSchema = new mongoose.Schema(
  {
    fixtureId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedGame", savedGameSchema);
