const { Category } = require("../models/category.model");
const noteServices = require("./note.service.js");

const createCategory = async () => {
  const category = {
    name: req.body.name,
    createdDate: new Date(),
  };
  const result = await category.save();
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

const getCategoriesUser = async () => {
  const result = await Category.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "note",
        localField: "_id",
        foreignField: "userId",
        as: "note",
      },
    },
    {
      $lookup: {
        from: "note",
        localField: "_id",
        foreignField: "categoryId",
        as: "note",
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: 1,
        createdDate: 1,
        updatedDate: 1,
        createdBy: "$user.email",
        UserCount: { $size: { $ifNull: ["$user", []] } },
        noteCount: { $size: { $ifNull: ["$note", []] } },
      },
    },
    {
      $sort: {
        createdDate: -1,
      },
    },
  ]);
  return result;
};

const searchCategory = async (searchQuery) => {
  const formattedExpression = `^${searchQuery}`;
  const category = await Category.findOne({
    name: { $regex: formattedExpression, $options: "i" },
  });

  return category;
};
module.exports = {
  createCategory,
  getCategories,
  categoryUpdate,
  categoryDelete,
  getCategoriesUser,
  searchCategory,
};
