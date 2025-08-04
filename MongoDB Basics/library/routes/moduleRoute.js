const express = require("express")
const librarymodel = require("../models/model")
const libraryRouter = express.Router()

libraryRouter.post("/add-items",async(req,res)=>{
    try{
        let addData = await librarymodel.create(req.body)
        res.status(200).json({msg:"item added",addData})
    console.log(addData)
    }catch(error){
        console.log(error)
        res.status(501).json({msg:"some thing wrong"})

    }
})
///patch
libraryRouter.patch("/update-items/:itemId",async(req,res)=>{
    let {itemId}= req.params
    try{
        let updateData = await librarymodel.findByIdAndUpdate(itemId)
        res.status(200).json({msg:"item added",updateData})
    console.log(updateData)
    }catch(error){
        console.log(error)
        res.status(501).json({msg:"some thing wrong"})

    }
})
///delete
libraryRouter.delete("/delete/:itemId",async(req,res)=>{
    let {itemId}= req.params
    try{
        let deleteItem = await librarymodel.findByIdAndDelete(itemId)
        res.status(200).json({msg:"item delete"})
    // console.log(updateData)
    }catch(error){
        console.log(error)
        res.status(501).json({msg:"some thing wrong"})

    }
})
module.exports=libraryRouter