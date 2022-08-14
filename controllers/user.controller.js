const userService = require("../services/user.service");
const jwtHelper = require("../helpers/jwt.helper");
const saltRounds = 10;
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
      const error = new Error("incorrect email ");
      error.statusCode = 404;
      throw error;
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
    error = new Error("error");
    error.statusCode = 404;
    throw error;
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    let oldRefreshToken = req.body.refreshToken;

    if (!oldRefreshToken) {
      const error = new Error("error ");
      error.statusCode = 404;
      throw error;
    }

    const userId = await jwtHelper.verifyRefreshToken(oldRefreshToken);
    if (!userId) {
      const error = new Error("error");
      error.statusCode = 404;
      throw error;
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

const getNbOfNote = async (req, res, next) => {
  try {
    const result = await services.getNbOfNote();

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logout,
  getNbOfNote,
};
