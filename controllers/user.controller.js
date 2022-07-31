const express = require("express");
const createErrors = require("http-errors");
const userService = require("../services/user.service");
const { User } = require("../models/user.model");
const jwtHelper = require("../helpers/jwt.helper");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const client = require("../helpers/jwt.helper");
const fs = require("fs");
const utils = require("../util");
const mailer = require("../helpers/mailer");

const registerUser = async (req, res, next) => {
  try {
    let userBody = req.body;

    userBody.password = await bcrypt.hash(userBody.password, saltRounds);
    const savedUser = await userService.createUser(userBody);
    let html = "<p>welcome</p>";
    const user = utils.makeObjectSelected(savedUser, ["_id", "first_name"]);
    const accessToken = await jwtHelper.signAccessToken(savedUser._id);
    const refreshToken = await jwtHelper.signRefreshToken(savedUser._id);
    const mail = mailer.send(
      constants.confirmEmails.from,
      req.body.email,
      "Confirm Account",
      html
    );

    res.status(200).send({
      user,
      accessToken,
      refreshToken,
      mail,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userBody = req.body;

    const findUser = await userService.findUniqueUser({
      email: userBody.email,
    });
    const passMatch = await bcrypt.compare(
      userBody.password,
      findUser.password
    );

    if (!passMatch) {
      throw createErrors.BadRequest("Incorrect email or password");
    }

    const accessToken = await jwtHelper.signAccessToken(findUser._id);
    const refreshToken = await jwtHelper.signRefreshToken(findUser._id);

    const user = utils.makeObjectSelected(findUser, ["_id", "first_name"]);

    res.status(200).send({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error.status && error.status == 404) {
      error = createErrors.BadRequest("Incorrect email or password");
      next(error);
    }
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    let oldRefreshToken = req.body.refreshToken;

    if (!oldRefreshToken) {
      throw createErrors.Forbidden("No refreshToken");
    }

    const userId = await jwtHelper.verifyRefreshToken(oldRefreshToken);
    if (!userId) {
      throw createErrors.Forbidden("No refreshToken");
    }

    const accessToken = await jwtHelper.signAccessToken(userId);
    const refreshToken = await jwtHelper.signRefreshToken(userId);
    res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  req.logout();
};
module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logout,
};
