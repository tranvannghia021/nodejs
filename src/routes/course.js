const express = require("express");
const router = express.Router();
const sourseController = require("../app/controllers/sourseController");

router.delete("/destroy/:id", sourseController.destroy);
router.delete("/forget", sourseController.forget);
router.post('/action/restore', sourseController.restoreCheckbox);
router.get('/restore/:id', sourseController.restore);

router.get("/edit/:id", sourseController.edit);
router.put("/edit/:id", sourseController.update);
router.get("/create", sourseController.create);
router.post("/store", sourseController.store);
router.get("/:slug", sourseController.show);


module.exports = router;
