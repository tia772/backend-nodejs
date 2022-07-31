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

const categoryDelete = async (req, res, next) => {
  try {
    const Category = await Category.findById(CategoryId);

    if (!Category) {
      throw createErrors.NotFound("No category found");
    }
    await Category.findByIdAndRemove(categoryId);
    res.send("category deleted");
  } catch (error) {
    next(error);
  }
};

const categoryUpdate = async (req, res, next) => {
  const CategoryId = req.params.CategoryId;
  if (!CategoryId.isEmpty()) {
    throw createErrors.NotFound("id could not be empty");
  }
  const name = req.body.name;

  try {
    const category = await Category.findById(CategoryId);
    if (!category) {
      throw createErrors.NotFound("No category found");
    }
    category.name = name;
    const result = await category.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  categoryDelete,
  getCategories,
  categoryUpdate,
};
