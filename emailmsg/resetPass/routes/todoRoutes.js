const express = require("express")
const todoModel = require("../models/todoModel")
const authMiddilware = require("../middileware/authMidilware")

const todoRouter = express.Router()

todoRouter.post("/addTask",authMiddilware ,async(req,res)=>{
   let newTask =  await todoModel.create(req.body)

    res.status(200).json({"update": newTask})
})

module.exports = todoRouter