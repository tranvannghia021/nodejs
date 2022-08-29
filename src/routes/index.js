const newRouter = require("./new");
const meRouter = require("./me");
const courseRouter = require("./course");
const sideRouter = require("./side");

function Router(app) {
  // router new
  app.use("/me", meRouter);
  app.use("/courses", courseRouter);
  app.use("/news", newRouter);
  app.use("/", sideRouter);
}

module.exports = Router;
