const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "public")));
// http logger
app.use(morgan("combined"));
// template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  res.render("home");
});
app.listen(port, () => console.log("http://localhost:" + port));
