const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["available", "borrowed", "reserved"],
    default: "available"
  },
  borrowerName: {
    type: String,
    default: null
  },
  borrowDate: {
    type: Date,
    default: null
  },
  dueDate: {
    type: Date,
    default: null
  },
  returnDate: {
    type: Date,
    default: null
  },
  overdueFees: {
    type: Number,
    default: 0
  }
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
