

class NewsControler {
  index(req, res, next) {
    res.render("news");
  }

}

module.exports = new NewsControler();
