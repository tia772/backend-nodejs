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
    res.send(savednote);
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

    const numNotes = await noteService.length(searchParams);
    let notes = await getNoteList.readNotes(searchParams, itemsPerPage, page);

    let totalPages = Math.ceil(numNotes / itemsPerPage);
    let currentPage = page + 1;

    res.send({
      result: notes,
      totalNotes: numNotes,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleNote = async (req, res, next) => {
  try {
    let searchParams = { _id: req.params.noteId };
    let selectFields = "";
    let note = await noteService.readnotes(searchParams, selectFields);

    note = note[0];
    if (!note) {
      throw createErrors.NotFound("No note found");
    }
    res.send(note);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getnoteList,
  getSingleNote,
  createNote,
};
