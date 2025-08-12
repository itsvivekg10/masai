const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: String,
  name: String,
  avatarUrl: String,
  email: String,
  provider: { type: String, default: "github" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
