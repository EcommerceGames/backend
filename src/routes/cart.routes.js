const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/authMiddleware");

//cart
router.post("/createCart", CartController.createCart);
router.put("/updateCart/:id", CartController.updateCart);
router.delete("/deleteCart/:id", CartController.deleteCart);
router.get("/getCart/:id", CartController.getCart);
module.exports = router;
