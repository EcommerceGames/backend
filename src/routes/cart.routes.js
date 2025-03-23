const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/authMiddleware");

//cart
router.post("/createCart", verifyToken, CartController.createCart);
router.put("/updateCart/:id", verifyToken, CartController.updateCart);
router.delete("/deleteCart", verifyToken, CartController.deleteCart);
router.get("/getCart/:id", CartController.getCart);
module.exports = router;
