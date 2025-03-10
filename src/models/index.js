const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.blogs = require("./blogs.model");
db.user = require("./user.model");
db.games = require("./games.model");

module.exports = db;
