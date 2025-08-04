const express = require("express");
const connectToDb = require("./mogoose.config.js/mongoose");
const orderRouter = require("./routes/order.router");

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Connect to DB
connectToDb();

// Route middleware
app.use("/orders", orderRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
