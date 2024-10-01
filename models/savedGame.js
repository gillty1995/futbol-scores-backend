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
      ref: "User",
      required: true,
    },
    teams: {
      home: {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        logo: {
          type: String,
          required: true,
        },
      },
      away: {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        logo: {
          type: String,
          required: true,
        },
      },
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "live", "completed"],
      required: true,
    },
    liveScore: {
      type: Object,
      default: {},
    },
    liveEvents: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedGame", savedGameSchema);
