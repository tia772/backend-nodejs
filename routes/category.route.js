const express = require("express");
const createErrors = require("http-errors");
const categoryCtrl = require("../controllers/category.controller");

const router = express.Router();

router.post("/", categoryCtrl.createCategory);
router.get("/", categoryCtrl.getCategories);
// router.put("/:id", categoryCtrl.categoryUpdate);
// router.delete("/:id", CategoryController.categoryDelete);

module.exports = router;
