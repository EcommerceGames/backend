const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    game_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Games",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WishList", wishListSchema);
