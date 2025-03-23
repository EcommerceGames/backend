const express = require("express");
const router = express.Router();
const WishListController = require("../controllers/wishlist.controller");
const { verifyToken } = require("../middleware/authMiddleware");

//wishlist
router.post("/createWishList", verifyToken, WishListController.createWishList);
router.delete(
  "/deleteWishList",
  verifyToken,
  WishListController.deleteWishList
);
router.get("/getWishList/:id", WishListController.getWishList);
module.exports = router;
