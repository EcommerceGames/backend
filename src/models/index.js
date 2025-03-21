const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.blogs = require("./blogs.model");
db.user = require("./user.model");
db.games = require("./games.model");
db.wishlist = require("./wishlist.model");
db.cart = require("./cart.model");

module.exports = db;
