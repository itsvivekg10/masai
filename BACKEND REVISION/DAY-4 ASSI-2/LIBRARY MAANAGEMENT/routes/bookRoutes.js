const express = require("express")
const { addBook } = require("../controllers/bookController")
const bookRouter = express.Router()

bookRouter.post("/addBook",addBook)
module.exports = bookRouter