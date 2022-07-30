// imports
const express = require("express");
const createErrors = require("http-errors");
const getNoteList = require("../services/note.service");
const { Note } = require("../models/note.model");

const itemsPerPage = 6;

const createNote = async (req, res, next) => {
  try {
    let noteBody = req.body;

    noteBody.writter = req.body.userId;

    const savedblog = await getNoteList.createBlog(blogBody);
    res.send(savedblog);
  } catch (error) {
    next(error);
  }
};

const getNoteList = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    const tagId = req.params.tagId;

    let searchParams = {};
    if (userId && userId.toLowerCase() != "all") {
      searchParams.writter = userId;
    }
    if (categoryId && categoryId.toLowerCase() != "all") {
      searchParams.category = categoryId;
    }
    if (tagId && tagId.toLowerCase() != "all") {
      searchParams.tag = tagId;
    }

    let perPage = itemsPerPage;
    let page = req.query.page && req.query.page > 0 ? req.query.page - 1 : 0;

    const numNotes = await noteService.countNotes(searchParams);
    let notes = await getNoteList.readNotes(
      searchParams,
      selectFields,
      perPage,
      page
    );

    let totalPages = Math.ceil(numNotes / perPage);
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

// exports
module.exports = {
  getNoteList,
  getSingleNote,
  createNote,
};
