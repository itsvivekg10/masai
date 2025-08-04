const  express = require("express")
const connectTodb = require("./config/mogoose.config")
const libraryRouter = require("./routes/moduleRoute")

const app = express()
 app.use(express.json());

connectTodb()
app.use("/items",libraryRouter)
app.listen(3000,()=>{
    console.log("started") 
})