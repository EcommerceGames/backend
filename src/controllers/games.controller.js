const db = require("../models/index");
const Games = db.games;
const { MESSAGE } = require("../utils/constants");

//CreateGames
exports.createGames = async (req, res) => {
  try {
    const { name, price, rate, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!name || !price || !rate || !type) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.REQUEST_BODY_IS_MISSING,
      });
    }

    const existingGame = await Games.findOne({ name, image });

    if (existingGame) {
      return res.status(400).json({
        status: "ERR",
        message: "Game already exists",
      });
    }
    const newGame = await Games.create({
      name,
      image: image,
      rate,
      price,
      type,
    });

    res.status(200).json({
      status: "OK",
      message: "CreateGames successfully!s",
      data: newGame,
    });
  } catch (error) {
    return res.status(500).json({
      message: "CreateGames failed",
      error: error.message,
    });
  }
};

//UpdateGames
exports.updateGames = async (req, res) => {
  try {
    const { name, price, rate, type } = req.body;
    const game = await Games.findById(req.params.id);
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image || user.image;

    const updateGame = await Games.findByIdAndUpdate(
      req.params.id,
      {
        ...game._doc,
        name,
        price,
        rate,
        type,
        image: image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateGame) {
      return res.status(400).json({
        status: "ERR",
        message: "Games not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "UpdateGames successfully!",
      data: updateGame,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateGames failed",
      error: error.message,
    });
  }
};

//deleteGames
exports.deleteGames = async (req, res) => {
  try {
    const deleteGames = await Games.findByIdAndDelete(req.params.id);

    if (!deleteGames) {
      return res.status(400).json({
        status: "ERR",
        message: "Games not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "DeleteGames successfully!",
      data: deleteGames,
    });
  } catch (error) {
    res.status(500).json({
      message: "DeleteGames failed",
      error: error.message,
    });
  }
};

//getGames
exports.getGames = async (req, res) => {
  try {
    const getGames = await Games.findById(req.params.id);

    if (!getGames) {
      return res.status(400).json({
        status: "ERR",
        message: "Games not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetGames successfully!",
      data: getGames,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetGames failed",
      error: error.message,
    });
  }
};

//GetAllGame
exports.getAllGames = async (req, res) => {
  try {
    const getAllGames = await Games.find();

    if (!getAllGames) {
      return res.status(400).json({
        status: "ERR",
        message: "Game not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetAllGames successfully!",
      data: getAllGames,
    });
  } catch (error) {
    return res.status(500).json({
      message: "GetAllGames failed",
      error: error.message,
    });
  }
};
