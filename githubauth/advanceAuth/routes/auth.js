const express = require("express");
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken, verifyRefresh } = require("../utils/tokens");
const TokenBlacklist = require("../models/TokenBlacklist");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();
const saltRounds = 10;

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, passwordHash: hash });
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const access = signAccessToken(user);
    const refresh = signRefreshToken(user);

    
    res.json({
      accessToken: access.token,
      refreshToken: refresh.token,
      accessJti: access.jti,
      refreshJti: refresh.jti
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.body;
    if (!accessToken && !refreshToken) return res.status(400).json({ error: "Provide tokens to blacklist" });

    const ops = [];
    if (accessToken) {
      try {
        const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        ops.push(TokenBlacklist.create({ jti: payload.jti, type: "access", expiresAt: new Date(payload.exp * 1000) }));
      } catch (e) { /* ignore invalid token */ }
    }
    if (refreshToken) {
      try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        ops.push(TokenBlacklist.create({ jti: payload.jti, type: "refresh", expiresAt: new Date(payload.exp * 1000) }));
      } catch (e) { }
    }

    await Promise.all(ops);
    res.json({ message: "Logged out (tokens blacklisted where valid)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Logout failed" });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "refreshToken required" });

    let payload;
    try {
      payload = verifyRefresh(refreshToken);
    } catch (e) {
      return res.status(401).json({ error: "Invalid/expired refresh token" });
    }

    const blacklisted = await TokenBlacklist.findOne({ jti: payload.jti, type: "refresh" });
    if (blacklisted) return res.status(401).json({ error: "Refresh token blacklisted" });

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: "User not found" });

    const access = signAccessToken(user);
    res.json({ accessToken: access.token, accessJti: access.jti });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Refresh failed" });
  }
});

module.exports = router;
