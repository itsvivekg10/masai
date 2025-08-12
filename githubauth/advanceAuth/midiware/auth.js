const TokenBlacklist = require("../models/TokenBlacklist");
const { verifyAccess } = require("../utils/tokens");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
    const token = authHeader.split(" ")[1];

    let payload;
    try {
      payload = verifyAccess(token);
    } catch (err) {
      return res.status(401).json({ error: "Invalid/expired token" });
    }

   
    const blacklisted = await TokenBlacklist.findOne({ jti: payload.jti, type: "access" });
    if (blacklisted) return res.status(401).json({ error: "Token blacklisted" });

    
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: "User not found" });

    if (user.subscription?.expiryDate && new Date() > user.subscription.expiryDate) {
      if (user.subscription.plan !== "free") {
        user.subscription.plan = "free";
        user.subscription.startDate = undefined;
        user.subscription.expiryDate = undefined;
        await user.save();
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Auth error" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

module.exports = { authMiddleware, requireRole };
