// imports
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

// exports
module.exports = {
  Category,
};
