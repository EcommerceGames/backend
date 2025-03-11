const db = require("../models/index");
const Blogs = db.blogs;
const { MESSAGE } = require("../utils/constants");

//Create
exports.createBlog = async (req, res) => {
  try {
    const { name, content, comment } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !content || !comment) {
      return res.status(400).json({
        status: "ERR",
        message: MESSAGE.THE_INPUT_IS_REQUIRED,
      });
    }

    const existingBlog = await Blogs.findOne({ name });

    if (existingBlog) {
      return res.status(400).json({
        status: "ERR",
        message: "Blog already exists",
      });
    }

    const newBlog = await Blogs.create({
      image: image,
      name,
      content,
      comment,
    });

    res.status(200).json({
      status: "OK",
      message: "CreateBlog successfully!",
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "createBlog failed",
      error: error.message,
    });
  }
};

//Update
exports.updateBlog = async (req, res) => {
  try {
    const { name, content, comment } = req.body;
    const blog = await Blogs.findById(req.params.id);
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image || user.image;

    const updateBlog = await Blogs.findByIdAndUpdate(
      req.params.id,
      {
        ...blog._doc,
        name,
        content,
        comment,
        image: image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateBlog) {
      return res.status(400).json({
        status: "ERR",
        message: "Blogs not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "UpdateBlogs successfully!",
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "UpdateBlogs failed",
      error: error.message,
    });
  }
};

//deleteGames
exports.deleteBlog = async (req, res) => {
  try {
    const deleteBlogs = await Blogs.findByIdAndDelete(req.params.id);

    if (!deleteBlogs) {
      return res.status(400).json({
        status: "ERR",
        message: "Blogs not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "DeleteBlogs successfully!",
      data: deleteBlogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "DeleteBlogs failed",
      error: error.message,
    });
  }
};

//getGames
exports.getBlogs = async (req, res) => {
  try {
    const getBlogs = await Blogs.findById(req.params.id);

    if (!getBlogs) {
      return res.status(400).json({
        status: "ERR",
        message: "Blogs not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetBlogs successfully!",
      data: getBlogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "GetBlogs failed",
      error: error.message,
    });
  }
};

//GetAllGame
exports.getAllBlogs = async (req, res) => {
  try {
    const getAllBlogs = await Blogs.find();

    if (!getAllBlogs) {
      return res.status(400).json({
        status: "ERR",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "GetAllBlog successfully!",
      data: getAllBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "GetAllBlog failed",
      error: error.message,
    });
  }
};
