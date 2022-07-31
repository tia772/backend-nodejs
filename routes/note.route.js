// imports
const express = require("express");
const createErrors = require("http-errors");
const noteCtrl = require("../controllers/note.controller");

const { verifyAccessToken } = require("../helpers/jwt.helper");

const router = express.Router();

router.post("/", verifyAccessToken, noteCtrl.createNote);
router.get("tagId/:categoryId?", verifyAccessToken, noteCtrl.getnoteList);
router.put("/:noteId", verifyAccessToken, noteCtrl.NoteUpdate);
router.delete("/:noteId", verifyAccessToken, noteCtrl.NoteDelete);

module.exports = router;
