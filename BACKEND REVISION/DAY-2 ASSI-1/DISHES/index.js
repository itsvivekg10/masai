const express = require("express")
const fs = require("fs").promises
const app = express()
app.use(express.json())
app.post("/addDish",async(req,res)=>{
    try{let newDish = req.body
        let data = await fs.readFile("db.json","utf-8")
        data = data?JSON.parse(data):[]
        data.push(newDish)
         await fs.writeFile("db.json", JSON.stringify(data, null, 2));
        res.status(200).JSON({ status: "Dish added successfully", dish: newDish })

     } catch(err){res.status(500).json({status:"not aded"})}
})
app.delete("/deleteDish/:name",async(req,res)=>{
try{
let dishName = req.params.name
let data = await fs.readFile("db.json","utf-8") 
}
})
app.listen(3000,()=>{
    console.log("app started")
})