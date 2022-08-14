const express = require("express");
const noteCtrl = require("../controllers/note.controller");
const { validateNoteReq } = require("../middlewares/note.middleware");
const { verifyAccessToken } = require("../helpers/jwt.helper");

const router = express.Router();

router.post(
  "/:tagId/:categoryId",
  validateNoteReq,
  verifyAccessToken,
  noteCtrl.createNote
);
router.get("/", verifyAccessToken, noteCtrl.getnoteList);
router.put("/:id", verifyAccessToken, validateNoteReq, noteCtrl.NoteUpdate);
router.delete("/:id", verifyAccessToken, noteCtrl.NoteDelete);
router.get("/:tagId", verifyAccessToken, noteCtrl.getSortedNoteByTag);

module.exports = router;
