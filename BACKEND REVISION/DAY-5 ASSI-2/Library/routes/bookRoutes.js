const express = require("express")
const addBooks = require("../controller/bookCntroller")

const bookRouter =  express.Router()
bookRouter.post("/addbook",addBooks)

module.exports= bookRouter