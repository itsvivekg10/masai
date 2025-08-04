const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/transport");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log("❌ DB Connection Error:", error);
  }
};

module.exports = connectToDb;
