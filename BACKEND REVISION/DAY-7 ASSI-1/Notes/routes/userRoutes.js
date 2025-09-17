const express = require("express")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const userModel = require("../models/userModel")

const userRouter = express.Router()

userRouter.post("/signUp",async(req,res)=>{
    const {name , email ,password}= req.body 
   await  bcrypt.hash(password,saltRounds,function(err,hash){
  userModel.create({
    name,
    email,
    password:hash
  })
    })
    res.status(200).json({"new":"aded"})
})
module.exports = userRouter