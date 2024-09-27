const express = require("express");
const router = express.Router();
const { createUser, login, getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserSignup,
  validateUserSignin,
  validateGameSave,
} = require("../middlewares/validation");

const {
  saveGame,
  getSavedGames,
  deleteGame,
} = require("../controllers/savedGame");

// User Routes
router.post("/signup", validateUserSignup, createUser); // Sign up a new user
router.post("/signin", validateUserSignin, login); // Sign in a user
router.get("/me", auth, getCurrentUser); // Get current user (authenticated)

// Saved Game Routes
router.post("/me/games", auth, validateGameSave, saveGame); // Save a game to the user's saved games (authenticated)
router.get("/me/games", auth, getSavedGames); // Get all saved games for the current user (authenticated)
router.delete("/me/games/:gameId", auth, deleteGame); // Delete a saved game (authenticated)

module.exports = router;
