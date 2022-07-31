// imports
const express = require("express");
const createErrors = require("http-errors");
const noteCtrl = require("../controllers/note.controller");

const { verifyAccessToken } = require("../helpers/jwt.helper");

const router = express.Router();

router.post("/", verifyAccessToken, verifyAccessToken, noteCtrl.createNote);
router.get(
  "tagId/:categoryId?",
  verifyAccessToken,
  verifyAccessToken,
  noteCtrl.getnoteList
);
// router.put("/:id", noteCtrl.NoteUpdate);
// router.delete("/:id", noteCtrl.NoteDelete);

module.exports = router;
