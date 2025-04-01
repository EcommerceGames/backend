const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/authMiddleware");

//cart
router.post("/createCart", CartController.createCart);
router.put("/updateCart/:id", CartController.updateCart);
router.delete("/deleteCart", CartController.deleteCart);
router.get("/getCart/:user_id", CartController.getCart);
module.exports = router;
