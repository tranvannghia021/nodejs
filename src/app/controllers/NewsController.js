class NewsControler {
  index(req, res) {
    res.render("news");
  }
}

module.exports = new NewsControler();
