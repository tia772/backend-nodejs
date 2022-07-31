const express = require("express");
const createErrors = require("http-errors");
const getNoteList = require("../services/note.service");
const { Note } = require("../models/note.model");

const itemsPerPage = 6;

const createNote = async (req, res, next) => {
  try {
    let noteBody = req.body;

    noteBody.writer = req.body.userId;

    const savednote = await getNoteList.createNote(noteBody);
    res.status(200).send(savednote);
  } catch (error) {
    next(error);
  }
};

const getnoteList = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    const tagId = req.params.tagId;

    let searchParams = {};
    if (categoryId) {
      searchParams.category = categoryId;
    }
    if (tagId) {
      searchParams.tag = tagId;
    }

    let page = req.query.page && req.query.page > 0 ? req.query.page : 0;
    let notes = await getNoteList.readNotes(searchParams, itemsPerPage, page);
    const numNotes = notes.length;
    let totalPages = Math.ceil(numNotes / itemsPerPage);
    let currentPage = page + 1;

    res.status(200).send({
      result: notes,
      totalNotes: numNotes,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  } catch (error) {
    next(error);
  }
};

const NoteDelete = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const noteId = await Note.findById(noteId);

    if (!noteId) {
      throw createErrors.NotFound("No note found");
    }
    if (noteId.writer.toString() !== req.userId) {
      throw createErrors.NotFound("No authenticated");
    }

    await noteId.findByIdAndRemove(noteId);

    const user = await User.findById(req.userId);
    user.notes.pull(noteId);
    await user.save();

    res.send("note deleted");
  } catch (error) {
    next(error);
  }
};
const NoteUpdate = async (req, res, next) => {
  const noteId = req.params.noteId;
  if (!noteId.isEmpty()) {
    throw createErrors.NotFound("No note found");
  }
  const title = req.body.title;
  const body = req.body.body;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      throw createErrors.NotFound("No note found");
    }
    if (note.writer.toString() !== req.userId) {
      throw createErrors.NotFound("No authenticated");
    }

    note.title = title;
    note.body = body;
    const result = await note.save();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getnoteList,
  createNote,
  NoteDelete,
  NoteUpdate,
};
