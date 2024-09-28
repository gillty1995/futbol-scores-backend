const SavedGame = require("../models/savedGame");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/badRequestError");
const mongoose = require("mongoose");

const saveGame = async (req, res, next) => {
  console.log("Request Body:", req.body);
  const {
    fixtureId,
    homeTeamId,
    awayTeamId,
    homeTeamName,
    awayTeamName,
    homeTeamLogo,
    awayTeamLogo,
    dateTime,
    liveScore,
    liveEvents,
  } = req.body;
  const userId = req.user._id;

  // Validate required fields
  if (
    !fixtureId ||
    !homeTeamId ||
    !awayTeamId ||
    !homeTeamName ||
    !awayTeamName ||
    !dateTime
  ) {
    return next(new BadRequestError("All fields are required."));
  }

  try {
    const savedGameData = {
      fixtureId,
      user: userId,
      teams: {
        home: {
          id: homeTeamId,
          name: homeTeamName,
          logo: homeTeamLogo,
        },
        away: {
          id: awayTeamId,
          name: awayTeamName,
          logo: awayTeamLogo,
        },
      },
      dateTime,
      liveScore,
      liveEvents,
    };

    console.log("Data to save:", savedGameData);

    const savedGame = await SavedGame.create(savedGameData);
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
    return res.status(204).send();
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
