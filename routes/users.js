// const router = require("express").Router();
// const {
//   createUser,
//   login,
//   getCurrentUser,
//   saveGame,
// } = require("../controllers/users");
// const auth = require("../middlewares/auth");
// const {
//   validateUserSignup,
//   validateUserSignin,
//   validateGameSave,
// } = require("../middlewares/validation");

// router.post("/signup", validateUserSignup, createUser);

// router.post("/signin", validateUserSignin, login);

// router.get("/me", auth, getCurrentUser);

// router.post("/me/games", auth, validateGameSave, saveGame);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { createUser, login, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserSignup,
  validateUserSignin,
} = require("../middlewares/validation");

// User Routes
router.post("/signup", validateUserSignup, createUser);
router.post("/signin", validateUserSignin, login);
router.get("/me", auth, getCurrentUser);

module.exports = router;
