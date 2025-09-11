const mongoose  =  require("mongoose")
const userModel = require("./userModel")
const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    rentedBy:[{type:mongoose.Schema.Types.ObjectId,ref:userModel}]
})
const bookModel = mongoose.model("book",bookSchema)
module.exports=bookModel