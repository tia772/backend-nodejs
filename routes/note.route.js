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
router.put(
  "/:noteId",
  verifyAccessToken,
  verifyAccessToken,
  noteCtrl.NoteUpdate
);
router.delete(
  "/:noteId",
  verifyAccessToken,
  verifyAccessToken,
  noteCtrl.NoteDelete
);

module.exports = router;
