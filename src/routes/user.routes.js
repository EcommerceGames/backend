const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

//SIGNIN
router.post("/signup", UserController.register);
router.post("/signin", UserController.login);
router.post("/logout", UserController.logout);
router.post("/refreshtoken", UserController.refreshToken);
router.post(
  "/createUser",
  verifyToken,
  upload.single("image"),
  UserController.addUser
);
router.put("/updateUser/:id", UserController.updateUser);
router.delete("/deleteUser/:id", verifyToken, UserController.deleteUser);
router.get("/getUser/:id", UserController.getUser);
router.get("/getAllUser", verifyToken, UserController.getAllUser);
module.exports = router;
