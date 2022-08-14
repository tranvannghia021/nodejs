const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const Router = require("./routes");
const app = express();
const port = 3000;

// middleware handle data body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
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

Router(app);
// app.get("/", (req, res) => {
//   res.render("home");
// });

// app.get("/search", (req, res) => {
//   const search = req.query.q;
//   res.render("search");
// });

// app.post("/search", (req, res) => {
//   console.log(req.body);
//   res.render("search");
// });
app.listen(port, () => console.log("http://localhost:" + port));
