const express = require("express");
const categoryCtrl = require("../controllers/category.controller");
const { validateCategoryReq } = require("../middlewares/category.middleware");

const router = express.Router();

router.post("/", validateCategoryReq, categoryCtrl.createCategory);
router.get("/", categoryCtrl.getCategories);
router.put("/:id", validateCategoryReq, categoryCtrl.categoryUpdate);
router.delete("/:id", categoryCtrl.categoryDelete);

module.exports = router;
