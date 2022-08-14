const Joi = require("joi");

const noteSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  body: Joi.string().min(3).max(30).required(),
});

module.exports = {
  noteSchema,
};
