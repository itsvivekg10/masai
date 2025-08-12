require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Mongo connected"))
  .catch(err => { console.error(err); process.exit(1); });

app.use("/auth", authRouter);

const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/profile", authMiddleware, async (req, res) => {
  const User = require("./models/User");
  const user = await User.findById(req.user.sub).select("-__v");
  res.json({ user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening ${PORT}`));
