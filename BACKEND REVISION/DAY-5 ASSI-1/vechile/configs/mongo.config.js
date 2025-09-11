const mongoose = require("mongoose")
const connectTodb = async()=>{
    await mongoose.connect("mongodb://localhost:27017/vechiles")
    console.log("dbconnected")
}
module.exports=connectTodb