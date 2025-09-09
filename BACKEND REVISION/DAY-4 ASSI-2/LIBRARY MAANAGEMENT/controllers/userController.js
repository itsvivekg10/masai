const BookModel = require("../models/bookModel");
const userModel = require("../models/userModel");

async function addUser(req,res){
try{
    let newUser = await userModel.create(req.body)
res.status(200).json({"res":newUser})
}catch(error){
    console.log(error)
    res.status(500).json({"res":error})
}
}
async function updateUserBorrowedList(req,res){
    try{
let {id}=req.params
let {bookId}= req.body
let user = await userModel.findById(id)
if(!user){ 
    return res.status(500).json({res:"user not found"})
}else{
    const book = await BookModel.findById(bookId)
    if(!book){
        return res.status(500).json({res:"bok Not found"})
    }else{
        if(book.status==="available"){
            user.borrowedBooks.push(bookId)
            book.status="borrowed",
            book.borrowerName=user.name,
             book.borrowDate = new Date();
    book.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    await book.save();
    await user.save()
        }else if(book.status==="borrowed"){
return res.status(200).json({res:"book have been borrowed"})
        }else if(book.status==="reserved"){
            return res.status(200).json({res:"book is reserved"})
        }
    }
}
    }catch(err){
        console.log(err)
    }
}
module.exports={addUser,updateUserBorrowedList}