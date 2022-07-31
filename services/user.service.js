const express = require("express");
const createErrors = require("http-errors");
const { User } = require("../models/user.model");

const createUser = async (userbody) => {
  try {
    const newUser = new User(userbody);
    const savedUser = await newUser.save();
    return Promise.resolve(savedUser);
  } catch (error) {
    if (error.code && error.code == 11000) {
      error = createErrors.Conflict(`${userbody.email} already exists`);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
};

const findUniqueUser = async (searchParams, selectFields = "") => {
  try {
    const userResult = await User.findOne(searchParams).select(selectFields);
    if (!userResult) {
      throw createErrors.NotFound("Incorrect information");
    }

    return Promise.resolve(userResult);
  } catch (error) {
    if (error.name == "CastError") {
      error = createErrors.BadRequest("Invalid Id");
    }
    return Promise.reject(error);
  }
};

module.exports = {
  createUser,
  findUniqueUser,
};
