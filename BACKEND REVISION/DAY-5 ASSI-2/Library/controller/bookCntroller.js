const bookModel = require("../models/booksModel")

async function addBooks(req,res){
try{
let newBook = await bookModel.create(req.body)
    res.status(200).json({res:newBook})
}catch(err){
    console.log(err)
}    
}
module.exports=addBooks