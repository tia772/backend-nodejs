const { noteSchema } = require("../validators/note.validator");

const validateNoteReq = async (req, res, next) => {
  try {
    await noteSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateNoteReq,
};
