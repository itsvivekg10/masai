const express = require("express");
const connectDB = require("./config/db");
const rentalRoutes = require("./routes/rental.routes");

const app = express();
app.use(express.json());

app.use("/", rentalRoutes);

connectDB();
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
