const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: String, require: true },
    type: { type: String, require: true },
    rate: { type: String, require: true },
    image: { type: String, require: true },
    video: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Games", gameSchema);
