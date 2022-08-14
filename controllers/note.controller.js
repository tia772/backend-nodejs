const services = require("../services/note.service");
const sender = require("../middlewares/responseSender");

const createNote = async (req, res, next) => {
  const note = {
    title: req.body.title,
    body: req.body.body,
    categoryId: req.params.categoryId,
    tagId: req.params.tagId,
  };

  try {
    const result = await services.createNote(note);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getnoteList = async (req, res, next) => {
  try {
    const result = await services.getNoteList();
    req.result = result;
    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const NoteDelete = async (req, res, next) => {
  try {
    const result = await services.NoteDelete(req.params.id);
    req.result = result;
    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};
const NoteUpdate = async (req, res, next) => {
  const updatedValues = {
    title: req.body.title,
    body: req.body.body,
    categoryId: req.body.categoryId,
    tagId: req.body.tagId,
  };

  try {
    const result = await services.NoteUpdate(updatedValues, req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getSortedNoteByTag = async (req, res, next) => {
  let parameters = {
    tagId: req.params.tagId,
  };

  if (Object.keys(req.query).length > 0) {
    parameters.tagName = req.query.tag;
    parameters.page = parseInt(req.query.page);
    parameters.limit = parseInt(req.query.limit);
  }

  try {
    const result = await services.getSortedNoteByTag(parameters);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getnoteList,
  createNote,
  NoteDelete,
  NoteUpdate,
  getSortedNoteByTag,
};
