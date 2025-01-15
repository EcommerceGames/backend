const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", authSchema);
