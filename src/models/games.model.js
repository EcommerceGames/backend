const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    price: { type: String, require: true },
    genre: { type: String, require: true },
    rating: { type: String, require: true },
    image: [{ type: String, require: true }],
    video: { type: String, require: true },
    content: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Games", gameSchema);
