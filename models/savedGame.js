const mongoose = require("mongoose");

const savedGameSchema = new mongoose.Schema(
  {
    fixtureId: {
      type: String,
      required: true,
      unique: true, // Ensures each game can only be saved once
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this references your User model correctly
      required: true, // Consider making this required
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
          required: true, // Assuming logo is essential to display
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
          required: true, // Assuming logo is essential to display
        },
      },
    },
    dateTime: {
      type: Date,
      required: true, // Ensure this captures when the game is scheduled
    },
    status: {
      type: String,
      enum: ["scheduled", "live", "completed"], // You can adjust this based on possible statuses
      required: true, // Status should be required
    },
    liveScore: {
      type: Object,
      default: {}, // Default to an empty object if no score is available
    },
    liveEvents: {
      type: [Object],
      default: [], // Default to an empty array if no events are available
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("SavedGame", savedGameSchema);
