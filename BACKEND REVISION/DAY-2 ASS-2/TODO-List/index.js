const express  = require("express")
const todoRoutes = require("./routes")

const app = express()
app.use(express.json())
app.use("/api",todoRoutes)

app.listen(3000,()=>{
    console.log("hello")
})