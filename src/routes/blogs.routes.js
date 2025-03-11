const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/blogs.controller");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/createBlog", verifyToken, BlogController.createBlog);
router.put("/updateBlog/:id", verifyToken, BlogController.updateBlog);
router.delete("/deleteBlog/:id", verifyToken, BlogController.deleteBlog);
router.get("/getBlog/:id", BlogController.getBlogs);
router.get("/getAllBlog", BlogController.getAllBlogs);
module.exports = router;
