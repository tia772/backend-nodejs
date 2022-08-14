const { Note } = require("../models/note.model");

const tagServices = require("./tag.service");

const createNote = async (noteBody) => {
  const newNote = new Track(noteBody);
  const result = await newNote.save();
  return result._id;
};

const getNoteList = async () => {
  const result = await Note.find();
  return result;
};

const NoteUpdate = async (values, id) => {
  const note = await Note.findById(id);

  if (note) {
    await Note.updateOne(
      { _id: id },
      {
        $set: values,
      },
      { omitUndefined: true }
    );

    return 200;
  } else {
    return 404;
  }
};

const NoteDelete = async (id) => {
  const note = await Note.findById(id);

  if (note) {
    await Note.deleteOne({ _id: id });

    return 200;
  } else {
    return 404;
  }
};

const getNotesByCategoryId = async (id) => {
  const notes = await Note.find({ categoryId: id });

  return notes;
};

const getSortedNoteByTag = async (parameters) => {
  const page = parameters.page - 1;
  const limit = parameters.limit;

  if (parameters.tagName) {
    const tag = await tagServices.searchTag(parameters.tagName);

    if (tag) {
      const notes = await Note.aggregate([
        { $match: { tagId: tag._id } },
        { $sort: { updatedDate: -1 } },
        { $skip: page * limit },
        { $limit: limit },
      ]);

      return tag;
    } else {
      return;
    }
  } else {
    return;
  }
};

module.exports = {
  createNote,
  getNoteList,
  NoteUpdate,
  NoteDelete,
  getNotesByCategoryId,
  getSortedNoteByTag,
};
