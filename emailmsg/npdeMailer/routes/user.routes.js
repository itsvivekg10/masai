const express = require("express");
const userModel = require("../models/auth.Model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const userRouter = express.Router();
const nodemailer = require("nodemailer");
// Register route
userRouter.post("/addUser", async (req, res) => {
  try {
    const { userName, email, pass } = req.body;

    // Hash password
    const hashedPass = await bcrypt.hash(pass, saltRounds);

    // Save new user
    const newUser = await userModel.create({
      userName,
      email,
      pass: hashedPass
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
console.log(req.body)
    // Find user by email
    const user1 = await userModel.findOne({ email });
    console.log(user1)
    if (!user1) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(pass, user1.pass);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
const token = jwt.sign({ userId: user1._id }, 'f715ff48dc9efbfd9b89180ffb7366de0c0646869e5a73cf7404751460b6abf3cfc240005c910d4c5b4ed4c77194b5d95a0601efb47d724aeb0f516287037a57', {
 expiresIn: '1h',
 });
    res.status(200).json({ message: "Login successful",token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "itsvivekg10@gmail.com",
    pass: "lwwr djnu ofso jbyw",
  },
});
userRouter.get("/sendEmail",async(req,res)=>{
   const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <itsvivekg10@gmail.com>',
    to: "bhaikhulkbolo@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
})
module.exports = userRouter;
