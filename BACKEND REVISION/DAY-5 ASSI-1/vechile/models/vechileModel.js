const mongoose = require("mongoose")
const tripSchema = new mongoose.Schema({
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true,
    min: [0.01, "Distance must be greater than 0"]
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});
const vechileSchema = mongoose.Schema({
    registrationNumber:{
        type:String,
        required:true,
        uniqe:true
    },
    type:{
        type:String,
        enum:["car","truck","bike"],
        required:true
    },
    model:{
        required:true,
        type:String
    },
    isActive:{
        required:true,
        type:Boolean,
        default:true,
    },
    trips:[tripSchema]
})

const vechileModel =  mongoose.model("vechile",vechileSchema)
module.exports=vechileModel