const express  = require("express")
const patinetModel = require("../model/patient.model")

const patientRouter =express.Router()

patientRouter.post("/addpatient",async(req,res)=>{
    let newPatient = await patinetModel.create(req.body)
res.status(200).json({"data":newPatient})
console.log(newPatient)
})
module.exports = patientRouter