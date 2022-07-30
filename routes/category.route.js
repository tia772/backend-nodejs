// imports
const express = require("express");
const createErrors = require("http-errors");
const categoryCtrl = require("../controllers/category.controller");

// constants
const router = express.Router();

// route: category/

router.post("/", categoryCtrl.createCategory);
router.get("/", categoryCtrl.getCategories);
// router.put("/:id", categoryCtrl.categoryUpdate);
// router.delete("/:id", CategoryController.categoryDelete);

// exports
module.exports = router;
