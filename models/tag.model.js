const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
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

const Tag = mongoose.model("Tag", tagSchema);

module.exports = {
  Tag,
};
