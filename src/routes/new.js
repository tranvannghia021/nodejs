const express = require("express");
const router = express.Router();
const newsControler = require("../app/controllers/NewsController");

router.use("/", newsControler.index);

module.exports = router;
