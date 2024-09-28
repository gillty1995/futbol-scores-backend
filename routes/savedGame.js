const router = require("express").Router();
const {
  saveGame,
  getSavedGames,
  deleteGame,
} = require("../controllers/savedGame");
const auth = require("../middlewares/auth");
const { validateGameSave } = require("../middlewares/validation");

router.post("/", auth, validateGameSave, saveGame);

router.get("/", auth, getSavedGames);

router.delete("/:fixtureId", auth, deleteGame);

module.exports = router;
