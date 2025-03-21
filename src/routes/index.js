const UserRoute = require("./user.routes");
const GamesRoute = require("./games.routes");
const BlogsRoute = require("./blogs.routes");
const WishListRoute = require("./wishlist.routes");
const CartRoute = require("./cart.routes");

const routes = (app) => {
  app.use("/user", UserRoute);
  app.use("/game", GamesRoute);
  app.use("/blog", BlogsRoute);
  app.use("/wishlist", WishListRoute);
  app.use("/cart", CartRoute);
};

module.exports = routes;
