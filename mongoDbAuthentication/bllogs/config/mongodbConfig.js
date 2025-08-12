const mongoose = require("mongoose")

const connectTodb = async()=>{
    await mongoose.connect("mongodb://localhost:27017/mydb")
    console.log("connected")
}
module.exports = connectTodb