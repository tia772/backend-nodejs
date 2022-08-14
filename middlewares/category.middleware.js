const { categorySchema } = require("../validators/category.validator");

const validateCategoryReq = async (req, res, next) => {
  try {
    await categorySchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCategoryReq,
};
