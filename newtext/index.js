const express = require("express");
const fs = require("fs");
const app = express();

// Route
app.get("/", (req, res) => {
  const data = fs.readFileSync("./data.txt", "utf-8");
  res.send(data);
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
