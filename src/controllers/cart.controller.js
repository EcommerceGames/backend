const db = require("../models/index");
const Cart = db.cart;
const { MESSAGE } = require("../utils/constants");

//CreateCart
exports.createCart = async (req, res) => {
  try {
    const { user_id, game_id, quantity } = req.body;

    if (!user_id || !game_id || !quantity) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.THE_INPUT_IS_REQUIRED,
      });
    }

    let existingCart = await Cart.findOne({ user_id, game_id });

    if (existingCart) {
      existingCart.quantity += quantity;
      await existingCart.save();
    } else {
      existingCart = new Cart({ user_id, game_id, quantity });
      await existingCart.save();
    }

    res.status(200).json({
      status: "OK",
      message: "CreateCart successfully!",
      data: existingCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "CreateCart failed",
      error: error.message,
    });
  }
};
//getCart theo idUser
exports.getCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    const cartItems = await Cart.find({ user_id }).populate("game_id");

    if (!cartItems) {
      return res.status(400).json({
        status: "ERR",
        message: "Cart not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetCart successfully!",
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "GetCart failed",
      error: error.message,
    });
  }
};
//deleteCart
exports.deleteCart = async (req, res) => {
  try {
    const deleteCart = await Cart.findByIdAndDelete(req.params.id);

    if (!deleteCart) {
      return res.status(400).json({
        status: "ERR",
        message: "Cart not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "DeleteCart successfully!",
      data: deleteCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "DeleteCart failed",
      error: error.message,
    });
  }
};

//updateCart
exports.updateCart = async (req, res) => {
  try {
    const { user_id, game_id, quantity } = req.body;

    if (!user_id || !game_id || quantity < 0) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.THE_INPUT_IS_REQUIRED,
      });
    }

    const cartItem = await Cart.findOne({ user_id, game_id });

    if (!cartItem) {
      return res.status(404).json({
        status: "ERR",
        message: "Cart item not found!",
      });
    }

    if (quantity === 0) {
      await Cart.findOneAndDelete({ user_id, game_id });
      return res.status(200).json({
        status: "OK",
        message: "Removed item from cart",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      status: "OK",
      message: "Cart updated successfully!",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update cart failed",
      error: error.message,
    });
  }
};
