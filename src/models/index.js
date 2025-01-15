const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.auth = require("./auth.model");
db.user = require("./user.model");
db.games = require("./games.model");

module.exports = db;
