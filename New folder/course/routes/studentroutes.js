const express = require("express");
const studentModel = require("../models/studentModel");
const studentRoute = express.Router();

studentRoute.post("/students", async (req, res) => {
  console.log("👉 Incoming Request Body:", req.body); // 🕵️ Log body

  try {
    const studentDetail = await studentModel.create(req.body);
    console.log("✅ Student Created:", studentDetail);
    res.status(201).json(studentDetail);
  } catch (error) {
    console.error("❌ Mongoose Error:", error); // 🧠 See full error
    res.status(500).json({ error: "Failed to create student" });
  }
});

module.exports = studentRoute;
