const mongoose =  require("mongoose")

const connectToDb = async()=>{
    await mongoose.connect("mongodb://localhost:27017/authdb")
    console.log("db connected")
}
module.exports=connectToDb