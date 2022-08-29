const courses = require("../models/course");

class SideControler {
  index(req, res, next) {
    courses
      .find({})
      .lean()
      .then((course) => {
        res.render("home", { course });
      })
      .catch(next);
  }

  search(req, res) {
    res.render("search");
  }
}

module.exports = new SideControler();
