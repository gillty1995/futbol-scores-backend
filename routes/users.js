const router = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  saveGame,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserSignup,
  validateUserSignin,
  validateGameSave,
} = require("../middlewares/validation");

// Route to sign up a new user
router.post("/signup", validateUserSignup, createUser);

// Route to sign in a user
router.post("/signin", validateUserSignin, login);

// Route to get the current user (authenticated)
router.get("/me", auth, getCurrentUser);

// Route to save a game to the user's saved games (authenticated)
router.post("/me/games", auth, validateGameSave, saveGame);

module.exports = router;
