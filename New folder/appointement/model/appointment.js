const mongoose = require("mongoose")
const appointmenScheema = new mongoose.Schema({
  doctorId: { type: ObjectId, ref: 'Doctor' },
  patientId: { type: ObjectId, ref: 'Patient' },
  consultedAt: { type: Date, default: Date.now },
  notes: String,
  isActive: { type: Boolean, default: true }
})
const appointModel = mongoose.model("appointment",appointmenScheema)
module.exports=appointModel 

