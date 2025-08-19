const jwt = require("jsonwebtoken");
const { users } = require("../models/db");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Missing token" });

    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === payload.id && u.username === payload.username);
    if (!user) return res.status(401).json({ error: "Invalid token" });

    req.user = { id: user.id, username: user.username };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { auth, JWT_SECRET };
