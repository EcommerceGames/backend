const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true, minlength: 6 },
    image: { type: String, require: true },
    phone: { type: Number, require: true },
    address: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
