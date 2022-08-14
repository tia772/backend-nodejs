const { Category } = require("../models/category.model");
const noteServices = require("./note.service.js");

const createCategory = async (categoryBody) => {
  const newCategory = new Category(categoryBody);
  const result = await newCategory.save();
  return result._id;
};

const getCategories = async () => {
  const result = await Category.find();
  return result;
};

const categoryUpdate = async (values, id) => {
  const category = await Category.findById(id);

  if (category) {
    await Category.updateOne(
      { _id: id },
      {
        $set: values,
      },
      { omitUndefined: true }
    );

    return 200;
  } else {
    return 404;
  }
};

const categoryDelete = async (id) => {
  const category = await Category.findById(id);

  if (category) {
    const notes = await noteServices.getNotesByCategoryId(id);

    if (notes) {
      return 409;
    } else {
      await Category.deleteOne({ _id: id });

      return 200;
    }
  } else {
    return 404;
  }
};

module.exports = {
  createCategory,
  getCategories,
  categoryUpdate,
  categoryDelete,
};
