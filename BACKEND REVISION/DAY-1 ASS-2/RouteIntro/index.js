const express = require("express")
const app = express()
app.get("/",(req,res)=>{
res.send(
    <h1>this is home pae</h1>

)

})
app.get("/contact",(req,res)=>{
res.send(
    <h1>this is contact pae</h1>

)
})
app.listen("3000",()=>{
    console.log("run")
})