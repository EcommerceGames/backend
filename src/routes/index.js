const UserRoute = require("./user.routes");
const GamesRoute = require("./games.routes");
const BlogsRoute = require("./blogs.routes");

const routes = (app) => {
  app.use("/user", UserRoute);
  app.use("/game", GamesRoute);
  app.use("/blog", BlogsRoute);
};

module.exports = routes;
