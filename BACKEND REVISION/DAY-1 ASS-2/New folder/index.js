const express = require("express");
const os = require("os");
const dns = require("dns");
const readFileContent = require("./read");

const app = express();

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", (req, res) => {
  const data = readFileContent();
  res.send(data);
});

app.get("/systemdetails", (req, res) => {
  const platform = os.platform();
  const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2); // in GB
  const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2); // in GB
  const cpuModel = os.cpus()[0].model;

  res.send(`
    <h2>System Details</h2>
    <p>Platform: ${platform}</p>
    <p>Total Memory: ${totalMem} GB</p>
    <p>Free Memory: ${freeMem} GB</p>
    <p>CPU Model: ${cpuModel}</p>
  `);
});

app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", (err, address) => {
    if (err) {
      return res.status(500).send("Error fetching IP: " + err.message);
    }
    res.send(`IP Address of masaischool.com is: ${address}`);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
