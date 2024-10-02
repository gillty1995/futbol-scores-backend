const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const savedGameRouter = require("./savedGame");

// Use User Routes
router.use("/", userRouter);

// Use Saved Game Routes
router.use("/me/games", savedGameRouter);

module.exports = router;
