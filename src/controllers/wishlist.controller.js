const db = require("../models/index");
const WishList = db.wishlist;
const { MESSAGE } = require("../utils/constants");

//CreateWishList
exports.createWishList = async (req, res) => {
  try {
    const { user_id, game_id } = req.body;

    if (!user_id || !game_id) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.THE_INPUT_IS_REQUIRED,
      });
    }

    const existingWishList = await WishList.findOne({ user_id, game_id });

    if (existingWishList) {
      return res.status(400).json({
        status: "ERR",
        message: "Wishlist already exists",
      });
    }
    const newWishList = await WishList.create({
      user_id,
      game_id,
    });

    res.status(200).json({
      status: "OK",
      message: "CreateWishList successfully!",
      data: newWishList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "CreateWishList failed",
      error: error.message,
    });
  }
};

//Get theo id user
exports.getWishList = async (req, res) => {
  try {
    const { user_id } = req.params;
    const wishlist = await WishList.find({ user_id }).populate("game_id");
    if (!wishlist) {
      return res.status(400).json({
        status: "ERR",
        message: "WishList not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetWishList successfully!",
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "GetWishList failed",
      error: error.message,
    });
  }
};

//delete
exports.deleteWishList = async (req, res) => {
  try {
    const deleteWishList = await WishList.findByIdAndDelete(req.params.id);

    if (!deleteWishList) {
      return res.status(400).json({
        status: "ERR",
        message: "WishList not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "DeleteWishList successfully!",
      data: deleteWishList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "DeleteWishList failed",
      error: error.message,
    });
  }
};
