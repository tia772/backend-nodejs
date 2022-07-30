// imports
const express = require("express");
const createErrors = require("http-errors");
const noteCtrl = require("../controllers/note.controller");

const { verifyAccessToken } = require("../helpers/jwt.helper");

// constants
const router = express.Router();

router.post("/", verifyAccessToken, verifyAccessToken, noteCtrl.createNote);
router.get("/:userId?/:categoryId?", noteCtrl.getnoteList);
// router.put("/:id", noteCtrl.NoteUpdate);
// router.delete("/:id", noteCtrl.NoteDelete);

// exports
module.exports = router;
