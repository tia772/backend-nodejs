const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },

  updatedDate: {
    type: Date,
  },
});

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
