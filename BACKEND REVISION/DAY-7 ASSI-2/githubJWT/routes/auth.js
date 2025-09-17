const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONTEND_URL,
} = process.env;

router.get("/github", (req, res) => {
  const state = Math.random().toString(36).substring(2); 
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&state=${state}`;
  res.redirect(redirectUri);
});

router.get("/github/callback", async (req, res) => {
  const { code /*, state*/ } = req.query;
  if (!code) return res.status(400).json({ error: "Missing code from GitHub" });

  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenRes.data.access_token;
    if (!accessToken) return res.status(400).json({ error: "No access token" });

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}`, Accept: "application/vnd.github.v3+json" },
    });
    const githubUser = userRes.data;

    let email = githubUser.email;
    if (!email) {
      try {
        const emailsRes = await axios.get("https://api.github.com/user/emails", {
          headers: { Authorization: `token ${accessToken}`, Accept: "application/vnd.github.v3+json" },
        });
        const primary = (emailsRes.data || []).find(e => e.primary && e.verified) || emailsRes.data[0];
        if (primary) email = primary.email;
      } catch (e) {
      }
    }

    
    const filter = { githubId: String(githubUser.id) };
    const update = {
      githubId: String(githubUser.id),
      username: githubUser.login,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
      email,
      provider: "github",
    };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const user = await User.findOneAndUpdate(filter, update, options);

  
    const payload = { sub: user._id.toString(), githubId: user.githubId, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN || "7d" });

    return res.json({ token, user });


  } catch (err) {
    console.error("GitHub OAuth error:", err.response?.data || err.message);
    return res.status(500).json({ error: "OAuth failed", details: err.message });
  }
});

module.exports = router;
