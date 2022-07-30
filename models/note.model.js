// imports
const mongoose = require("mongoose");
const { Schema } = mongoose;
const NoteSchema = new Schema(
  {
    writter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    Tag: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

// exports
module.exports = {
  Note,
};
