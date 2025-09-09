const mongoose = require("mongoose")
const connectToDb = async()=>{
    await mongoose.connect("mongodb://localhost:27017/libraryManagement")
    console.log("db connected")
}
module.exports= connectToDb