const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

//SIGNIN
router.post("/signup", UserController.register);
router.post("/signin", UserController.login);
router.post("/logout", UserController.logout);
router.post("/refreshtoken", UserController.refreshToken);
module.exports = router;
