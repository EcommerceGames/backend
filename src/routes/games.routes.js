const express = require("express");
const router = express.Router();
const GamesController = require("../controllers/games.controller");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/createGames", verifyToken, GamesController.createGames);
router.put("/updateGames/:id", verifyToken, GamesController.updateGames);
router.delete("/deleteGames/:id", verifyToken, GamesController.deleteGames);
router.get("/getGame/:id", verifyToken, GamesController.getGames);
router.get("/getAllGames", GamesController.getAllGames);
module.exports = router;
