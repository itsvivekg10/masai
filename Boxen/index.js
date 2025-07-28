const express = require("express");
const boxen = require("boxen");

const app = express();

const message = "I am using my first external module!";
const title = "Hurray!!!";

const classicBox = boxen(`${title}\n${message}`, { padding: 1 });

const singleDoubleBox = boxen(`${title}\n${message}`, {
  padding: 1,
  borderStyle: "singleDouble",
});

const roundBox = boxen(`${title}\n${message}`, {
  padding: 1,
  borderStyle: "round",
});

console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
