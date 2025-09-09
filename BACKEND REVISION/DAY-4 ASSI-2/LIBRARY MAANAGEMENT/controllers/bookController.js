const BookModel = require("../models/bookModel");

async function addBook(req,res){
try{
let newbook = await BookModel.create(req.body)
res.status(200).json({res:newbook})
}catch(err){
    console.log(err)
    res.status(500).json({res:err})
}
}
module.exports={addBook}