const mongoose = require("mongoose")

const enrollSchema =  new mongoose.Schema({
    courseId :{type:mongoose.Schema.Types.ObjectId,ref:"course"},
    studentId :{type:mongoose.Schema.Types.ObjectId,ref:"student"}
})

const enrollModel = mongoose.model("enroll",enrollSchema)
module.exports= enrollModel