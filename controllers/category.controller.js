const express = require("express");
const createErrors = require("http-errors");
const categoryService = require("../services/category.service");
const noteService = require("../services/note.service");
const { Category } = require("../models/category.model");

const createCategory = async (req, res, next) => {
  try {
    let categoryBody = req.body;

    const savedCategory = await categoryService.createCategory(categoryBody);
    res.send(savedCategory);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    let searchParams = {};
    const categories = await categoryService.readCategory(searchParams);
    res.send(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
};
