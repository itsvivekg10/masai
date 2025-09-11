const  express = require("express")
const { addUser,borrowedBook } = require("../controller/userController")
const userRouter = express.Router()
userRouter.post("/adduserRouter",addUser)
userRouter.patch("/update",borrowedBook)
module.exports=userRouter