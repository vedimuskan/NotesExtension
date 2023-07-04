const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
