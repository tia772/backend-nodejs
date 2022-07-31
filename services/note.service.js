const express = require("express");
const createErrors = require("http-errors");
const { Note } = require("../models/note.model");

const createNote = async (noteBody) => {
  try {
    const newNote = new Note(noteBody);
    let savedNote = await newNote.save();

    savedNote = await savedNote
      .populate("writer", "first_name last_name joined")
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
      .populate("writer", "first_name last_name joined")
      .populate("category", "name")
      .populate("tag", "name")
      .select(selectFields);
    return Promise.resolve(notes);
  } catch (error) {
    if (error.name == "CastError") {
      error = createErrors.BadRequest("Invalid Id");
    }
    return Promise.reject(error);
  }
};

module.exports = {
  createNote,
  readNotes,
};
