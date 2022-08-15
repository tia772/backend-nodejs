const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  createdDate: {
    type: Date,
  },

  updatedDate: {
    type: Date,
  },
});

categorySchema.index({ name: 1 });

const Category = mongoose.model("Category", categorySchema);
module.exports = {
  Category,
};
