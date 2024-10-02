const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email required."],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password required."],
    select: false,
    validate: {
      validator(value) {
        const passwordRegex = /^(?=.*[!@#$%^&*])/;
        return value.length >= 6 && passwordRegex.test(value);
      },
      message:
        "Password should be at least 6 characters long and contain at least one special character",
    },
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  savedGames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SavedGame",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
