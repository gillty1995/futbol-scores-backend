const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const savedGameRouter = require("./savedGame");
const contactRouter = require("./contact");

// User Routes
router.use("/", userRouter);

// Saved Game Routes
router.use("/me/games", savedGameRouter);

// Contact Route
router.use("/contact", contactRouter);

module.exports = router;
