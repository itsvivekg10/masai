const mongoose = require("mongoose")
const taskSchema = new  mongoose.Schema({
title:String,
description:String,
status:Boolean,
dueDate:new Date
})
const tasksModel = mongoose.model("tasks",taskSchema)