const router = require("express").Router();
const {
  saveGame,
  getSavedGames,
  deleteGame,
} = require("../controllers/savedGame");
const auth = require("../middlewares/auth");
const { validateGameSave } = require("../middlewares/validation");

// Route to save a new game (authenticated)
router.post("/", auth, validateGameSave, saveGame);

// Route to get all saved games for the current user (authenticated)
router.get("/", auth, getSavedGames);

// Route to delete a saved game (authenticated)
router.delete("/:gameId", auth, deleteGame);

module.exports = router;
