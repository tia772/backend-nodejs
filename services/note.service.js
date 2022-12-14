const { Note } = require("../models/note.model");

const tagServices = require("./tag.service");
const categoryServices = require("./category.service");

const createNote = async () => {
  const note = {
    title: req.body.title,
    body: req.body.body,
    categoryId: req.params.categoryId,
    tagId: req.params.tagId,
  };

  const result = await note.save();
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

const getNote = async (parameters) => {
  if (parameters.CategoryName) {
    const category = await categoryServices.searchCategory(
      parameters.CategoryName
    );

    if (category) {
      const notes = await Note.aggregate([
        {
          $lookup: {
            from: "note",
            localField: "_id",
            foreignField: "categoryId",
            as: "note",
          },
        },
        {
          $unwind: {
            path: "$note",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 0,
            id: "$_id",
            title: 1,
            category: "$note.categoryId",
            createdDate: 1,
            noteCount: { $size: { $ifNull: ["$note", []] } },
          },
        },
        {
          $sort: {
            createdDate: -1,
          },
        },
      ]);

      return category;
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
  getNote,
};
