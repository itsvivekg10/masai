    const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.use("/", userRoutes);
app.use(errorHandler);

connectDB();

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
