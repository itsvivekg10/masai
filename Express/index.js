const express = require("express")
const app = express()
app.get("/",(req,res)=>{
res.send("hellot this is ")
})
app.get("/contact",(req,res)=>{
    res.send("contact me ")
})
app.listen(3000,()=>{
    console.log("this is 3000 port")
})