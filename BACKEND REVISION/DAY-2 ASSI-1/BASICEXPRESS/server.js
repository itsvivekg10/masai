let express = require("express")
const app = express()
app.get("/home",(req,res)=>{
res.status(200).send(<h1>welcome to home page</h1>)
})
app.get("/aboutUs",(req,res)=>{
    res.status(200).JSON({data:"about us"})
})
app.get("/contactus",(req,res)=>{
    res.send(<h1>contactus</h1>)
})
app.listen("3000",()=>{
    console.log("serverStarted")
})