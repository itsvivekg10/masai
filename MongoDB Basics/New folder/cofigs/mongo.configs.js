const mongoose = require("mongoose")

const connnectToDb =  async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/task")
        console.log("connected")
    }catch(error){
        console.log(err)
    }
}
module.exports=connnectToDb;