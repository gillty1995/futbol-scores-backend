const SavedGame = require("../models/SavedGame");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");

const saveGame = async (req, res, next) => {
  const { title, genre } = req.body;
  const userId = req.user._id; // Get the user ID from the authenticated user

  try {
    const savedGame = await SavedGame.create({ title, genre, user: userId });
    return res.status(201).send(savedGame);
  } catch (err) {
    console.error(err);
    return next(new BadRequestError("Invalid data provided."));
  }
};

const getSavedGames = async (req, res, next) => {
  const userId = req.user._id; // Get the user ID from the authenticated user

  try {
    const savedGames = await SavedGame.find({ user: userId });
    return res.status(200).send(savedGames);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteGame = async (req, res, next) => {
  const { gameId } = req.params;
  const userId = req.user._id; // Get the user ID from the authenticated user

  try {
    const game = await SavedGame.findOneAndDelete({
      _id: gameId,
      user: userId,
    });
    if (!game) {
      return next(new NotFoundError("Game not found."));
    }
    return res.status(204).send(); // No content to send back
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  saveGame,
  getSavedGames,
  deleteGame,
};
