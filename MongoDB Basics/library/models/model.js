const mongoose = require("mongoose")

const librarySchema = new mongoose.Schema({
    title: String,  // For books
  author: String,
  status: String, // "available", "borrowed", "reserved"
  borrowerName: String,  // If borrowed
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  overdueFees: Number,  // Ca
})

const librarymodel = mongoose.model("items",librarySchema)
module.exports=librarymodel