const express = require("express")
const connectTodb = require("./configs/mongo.config")
const app = express()
connectTodb()
app.listen(3000,()=>{
    console.log("port started")
})