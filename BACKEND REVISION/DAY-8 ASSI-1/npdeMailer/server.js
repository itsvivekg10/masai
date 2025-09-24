const express = require("express")
const connectToDb = require("./configs/mongo.configs")
const userRouter = require("./routes/user.routes")
const todoRouter = require("./routes/todoRoutes")
const app = express()
connectToDb()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api",userRouter)
app.use("/todo",todoRouter)
app.listen(3000,()=>{
    console.log("port started")
})