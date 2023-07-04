const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

mongoose
  .connect("mongodb://127.0.0.1:27017/xyz", { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  });

// Array to store the notes
// let notes = [];
let noteSchema = new mongoose.Schema({
  note: String,
});
const Note = mongoose.model("note", noteSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Route for retrieving all notes
app.get("/api/notes", async (req, res) => {
  let notes = await Note.find({});
  res.json(notes);
});

// Route for adding a new note
app.post("/api/notes", async (req, res) => {
  const newNote = new Note({
    note: req.body.content,
  });
  await newNote.save();
  let notes = await Note.find({});

  console.log(notes);
  console.log(newNote);

  // notes.push(newNote);
  // res.status(201).json(newNote);

  res.status(201).json(notes);
});

// Route for deleting a note
app.delete("/api/notes/:id", async (req, res) => {

  await Note.findByIdAndDelete(req.params.id);

  // let notes= await Note.find({});
  // notes = notes.filter((note) => note.id !== noteId);

  res.sendStatus(204);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
