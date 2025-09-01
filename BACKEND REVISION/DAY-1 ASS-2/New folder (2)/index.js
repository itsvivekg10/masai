const express = require("express");
const getFileInfo = require("./fileinfo");
const parseURL = require("./urlparser");

const app = express();

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/fileinfo", (req, res) => {
  const { filepath } = req.query;
  if (!filepath) {
    return res.status(400).json({ error: "Please provide a filepath query parameter" });
  }
  const info = getFileInfo(filepath);
  res.json(info);
});

app.get("/parseurl", (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Please provide a url query parameter" });
  }
  const info = parseURL(url);
  res.json(info);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
