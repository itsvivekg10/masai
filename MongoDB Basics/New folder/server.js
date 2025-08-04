const express = require("express")
const connnectToDb = require("./cofigs/mongo.configs")
const app = express()
connnectToDb()
app.listen(3000,()=>{
    console.log("port started")
    
})