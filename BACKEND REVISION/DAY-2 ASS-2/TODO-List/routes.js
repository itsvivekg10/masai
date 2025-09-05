const express  = require("express")
// const addData = require("./controllers")
const todoMiddilware = require("./middilware")
const { addData, deleteData } = require("./controllers")

let todoRoutes = express.Router()

todoRoutes.post("/addTask",todoMiddilware,addData)
todoRoutes.delete("/deletTask/id",deleteData)
module.exports= todoRoutes