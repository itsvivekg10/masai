const express  = require("express")
const doctorModel = require("../model/patient.model")

const doctorRouter =express.Router()

doctorRouter.post("/addDoctor",async(req,res)=>{
    let newDoctor = await doctorModel.create(req.body)
res.status(200).json({"data":newDoctor})
console.log(newDoctor)
})
module.exports = doctorRouter