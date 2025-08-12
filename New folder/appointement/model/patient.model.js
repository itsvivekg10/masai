const mongoose =  require("mongoose")
const patientScheema = new  mongoose.Schema({
    name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
})
const patinetModel = mongoose.model("patient",patientScheema)

module.exports=patinetModel