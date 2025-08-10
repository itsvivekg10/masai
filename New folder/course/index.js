const express = require("express")
const connectToDb = require("./configs/mongo.configs");
const studentRoute = require("./routes/studentroutes");
const courserouter = require("./routes/courseRoutes");
const lmsRoutes = require("./routes/lmsRoutes");
const app = express()
app.use(express.json());
app.use('/api',studentRoute)
app.use("/api",courserouter)
app.use("/api",lmsRoutes)
connectToDb()
app.listen(3000,()=>{
    console.log("port started")
})