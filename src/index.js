require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const Router = require("./routes");
const database = require("./configs/databases");
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/sortMiddleware');
const app = express();
const port = 3000;
// connect db

database.connect();
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

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// middleware
app.use(sortMiddleware);

// template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (filed, sort) => {
        let sortType = 'default';
        let sortColunm = filed;
        if (filed === sort.colunm) {

          if (sort.enabled == true) {
            sortType = sort.type;
            sortColunm = sort.colunm;
          }
        }
        const icons = {
          default: 'fa fa-sort',
          asc: 'fa fa-sort-amount-asc',
          desc: 'fa fa-sort-amount-desc',
        }
        const types = {
          default: 'desc',
          desc: 'asc',
          asc: 'desc'
        }

        return `<a href="?_sort&_colunm=${sortColunm}&_type=${types[sortType]}">
        <i class="${icons[sortType]}" aria-hidden="true"></i>
      </a>`;
      }
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

Router(app);

app.listen(port, () => console.log("http://localhost:" + port));
