const express = require("express");
const router = express.Router();
const newsControler = require("../app/controllers/NewsController");

router.get("/", newsControler.index);

module.exports = router;
