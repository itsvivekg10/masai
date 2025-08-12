const mongoose =  require("mongoose")
const doctorSheema = new  mongoose.Schema({
    name: String,
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
})
const doctorModel = mongoose.model("patient",doctorSheema)

module.exports=doctorModel