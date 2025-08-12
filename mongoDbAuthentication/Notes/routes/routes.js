const express = require("express");
const Note = require("../models/noteModel"); // Import the Note schema
const noteRouter = express.Router();

noteRouter.post("/", async (req, res) => {
  try {
    const { title, content, tags, user } = req.body;

    const newNote = new Note({ title, content, tags, user });
    await newNote.save();

    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.query; // ?userId=123
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

noteRouter.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

noteRouter.patch("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

noteRouter.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = noteRouter;
