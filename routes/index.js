// const express = require("express");
// const router = express.Router();
// const { createUser, login, getCurrentUser } = require("../controllers/users");
// const auth = require("../middlewares/auth");
// const {
//   validateUserSignup,
//   validateUserSignin,
//   validateGameSave,
// } = require("../middlewares/validation");

// const {
//   saveGame,
//   getSavedGames,
//   deleteGame,
// } = require("../controllers/savedGame");

// // User Routes
// router.post("/signup", validateUserSignup, createUser);
// router.post("/signin", validateUserSignin, login);
// router.get("/me", auth, getCurrentUser);

// // Saved Game Routes
// router.post("/me/games", auth, validateGameSave, saveGame);
// router.get("/me/games", auth, getSavedGames);
// router.delete("/me/games/:fixtureId", auth, deleteGame);

// module.exports = router;

const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const savedGameRouter = require("./savedGame");

// Use User Routes
router.use("/", userRouter);

// Use Saved Game Routes
router.use("/me/games", savedGameRouter);

module.exports = router;
