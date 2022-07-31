const express = require("express");
const createErrors = require("http-errors");
const categoryCtrl = require("../controllers/category.controller");

const router = express.Router();

router.post("/", categoryCtrl.createCategory);
router.get("/", categoryCtrl.getCategories);
router.put("/:CategoryId", categoryCtrl.categoryUpdate);
router.delete("/:CategoryId", categoryCtrl.categoryDelete);

module.exports = router;
