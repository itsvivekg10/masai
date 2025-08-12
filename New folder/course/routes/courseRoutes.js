const express = require("express")
const courseModel = require("../models/couseModel")
const courserouter = express.Router()

courserouter.post("/cousre",async(req,res)=>{
    try{const newCourse  = await courseModel.create(req.body)
        console.log(newCourse)
        res.send(200).json({data:newCourse})
    }
    catch(err){
res.status(500).json({ error: "Failed to create student" });
    }
})

module.exports = courserouter