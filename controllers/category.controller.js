const sender = require("../middlewares/responseSender");
const services = require("../services/category.service");

const createCategory = async (req, res, next) => {
  try {
    const result = await services.createCategory(category);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const result = await services.getCategories();

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const categoryDelete = async (req, res, next) => {
  try {
    const result = await services.categoryDelete(req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

const categoryUpdate = async (req, res, next) => {
  const updatedValues = {
    name: req.body.name,
    updatedDate: new Date(),
  };

  try {
    const result = await services.categoryUpdate(updatedValues, req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createCategory,
  categoryDelete,
  getCategories,
  categoryUpdate,
};
