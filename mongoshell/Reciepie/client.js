const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("recipe_management");
    return db.collection("recipes");
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
