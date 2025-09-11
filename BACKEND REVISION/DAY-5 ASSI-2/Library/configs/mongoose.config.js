const mongoose  = require("mongoose")

async function conectToDb  (){
    await  mongoose.connect("mongodb://127.0.0.1:27017/mylibb")
    console.log("db connect")
}
module.exports= conectToDb