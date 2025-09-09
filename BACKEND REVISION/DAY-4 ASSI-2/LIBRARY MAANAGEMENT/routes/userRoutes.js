const express = require("express")
const { addUser, updateUserBorrowedList } = require("../controllers/userController")
const userRouter  = express.Router()

userRouter.post("/addUser",addUser)
userRouter.patch("/update/:id",updateUserBorrowedList)
module.exports=userRouter