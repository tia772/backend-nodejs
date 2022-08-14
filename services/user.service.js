const { User } = require("../models/user.model");
const Note = require("../models/note.model");

const createUser = async (userbody) => {
  try {
    const newUser = new User(userbody);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return 404;
  }
  return 404;
};

const findUniqueUser = async (searchParams, selectFields = "") => {
  try {
    const userResult = await User.findOne(searchParams).select(selectFields);
    if (!userResult) {
      return 404;
    }

    return userResult;
  } catch (error) {
    return 404;
  }
};

const getNbOfNote = async () => {
  const result = await Note.aggregate([
    { $project: { name: { $toUpper: "$_id" }, _id: 0 } },
    { $group: { _id: { writerId: "$writerId" }, numberOfNotes: { $sum: 1 } } },
  ]);

  return result;
};

module.exports = {
  createUser,
  findUniqueUser,
  getNbOfNote,
};
