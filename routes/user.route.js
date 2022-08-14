const express = require("express");
const userCtrl = require("../controllers/user.controller");

const {
  validateRegisterReq,
  validateLoginReq,
} = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/register", validateRegisterReq, userCtrl.registerUser);
router.post("/login", validateLoginReq, userCtrl.loginUser);
router.get("/getNbOfNote", userCtrl.getNbOfNote);
router.post("/me/refreshToken", userCtrl.refreshToken);
router.delete("/logout", userCtrl.logout);

module.exports = router;
