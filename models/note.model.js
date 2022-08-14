const mongoose = require("mongoose");
const { Schema } = mongoose;
const NoteSchema = new Schema({
  writerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tagId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  createdDate: {
    type: Date,
  },

  updatedDate: {
    type: Date,
  },
});

NoteSchema.index({ writer: 1 });

const Note = mongoose.model("Note", NoteSchema);

module.exports = {
  Note,
};
