const SavedGame = require("../models/savedGame");
const User = require("../models/users");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");
const mongoose = require("mongoose");

const saveGame = async (req, res, next) => {
  console.log("Request Body:", req.body);
  const {
    fixtureId,
    teams: { home, away },
    dateTime,
    status,
    liveScore,
    liveEvents,
  } = req.body;
  const userId = req.user._id;

  // Validatation
  if (
    !fixtureId ||
    !home.id ||
    !away.id ||
    !home.name ||
    !away.name ||
    !home.logo ||
    !away.logo ||
    !dateTime ||
    !status
  ) {
    return next(new BadRequestError("All fields are required."));
  }

  try {
    const savedGameData = {
      fixtureId,
      user: userId,
      teams: {
        home: {
          id: home.id,
          name: home.name,
          logo: home.logo,
        },
        away: {
          id: away.id,
          name: away.name,
          logo: away.logo,
        },
      },
      dateTime,
      status,
      liveScore,
      liveEvents,
    };

    console.log("Data to save:", savedGameData);

    const savedGame = await SavedGame.create(savedGameData);

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { savedGames: savedGame },
      },
      { new: true }
    );

    return res.status(201).send(savedGame);
  } catch (err) {
    console.error("Error details:", err);
    return next(new BadRequestError("Invalid data provided."));
  }
};

const getSavedGames = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const savedGames = await SavedGame.find({ user: userId });
    return res.status(200).send(savedGames);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteGame = async (req, res, next) => {
  const { fixtureId } = req.params;
  const userId = req.user._id;

  try {
    const game = await SavedGame.findOneAndDelete({
      fixtureId,
      user: userId,
    });

    if (!game) {
      return next(new NotFoundError("Game not found."));
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { savedGames: game._id },
    });

    return res.status(200).json({ message: "Game unsaved successfully." });
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
