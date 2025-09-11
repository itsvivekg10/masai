const mongoose = require("mongoose")
const bookModel = require("./booksModel")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    rentedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:bookModel}]
})
const userModel = mongoose.model("user",userSchema)
module.exports=userModel