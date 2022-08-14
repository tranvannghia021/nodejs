const newRouter = require("./new");
const sideRouter = require("./side");

function Router(app) {
  // router new
  app.use("/news", newRouter);
  app.use("/", sideRouter);
}

module.exports = Router;
