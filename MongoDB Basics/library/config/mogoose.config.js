const mongoose = require("mongoose")

const connectTodb = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/library")
        console.log("library connected")
    }catch(error){
console.log("not connected")
    }
}

module.exports = connectTodb