const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    content: { type: String, require: true },
    image: { type: String, require: true },
    comment: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema);
