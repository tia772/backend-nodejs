// imports
const express = require("express");
const createErrors = require("http-errors");
const { Note } = require("../models/note.model");

// CRUD

const createNote = async (noteBody) => {
  try {
    const newNote = new Note(noteBody);
    let savedNote = await newNote.save();

    savedNote = await savedNote
      .populate("writter", "first_name last_name joined")
      .populate("category", "name")
      .populate("tag", "name")
      .execPopulate();

    return Promise.resolve(savedNote);
  } catch (error) {
    return Promise.reject(error);
  }
};

const readNotes = async (
  searchParams = {},
  selectFields = "",
  perPage = 99999999,
  page = 0
) => {
  try {
    const Notes = await Note.find(searchParams)
      .limit(perPage)
      .skip(perPage * page)
      .populate("writter", "first_name last_name joined")
      .populate("category", "name")
      .populate("tag", "name")
      .select(selectFields);
    return Promise.resolve(notes);
  } catch (error) {
    if (error.name == "CastError") {
      error = createErrors.BadRequest("Invalied blogId");
    }
    return Promise.reject(error);
  }
};

const countNotes = async (countParams) => {
  try {
    const numNotes = await Blog.where(countParams).countDocuments();
    return Promise.resolve(numBlogs);
  } catch (error) {
    if (error.name == "CastError") {
      error = createErrors.BadRequest("Invalied Id provided");
    }
    return Promise.reject(error);
  }
};

module.exports = {
  createNote,
  readNotes,
  countNotes,
};
