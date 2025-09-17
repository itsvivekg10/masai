const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();
const User = require("../models/User");

const PLAN_DAYS = 30;

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

router.post("/subscribe", authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!["free","premium","pro"].includes(plan)) return res.status(400).json({ error: "Invalid plan" });

    const user = req.user;
    if (plan === "free") {
      user.subscription = { plan: "free" };
    } else {
      const start = new Date();
      const expiry = addDays(start, PLAN_DAYS);
      user.subscription = { plan, startDate: start, expiryDate: expiry };
    }
    await user.save();
    res.json({ message: "Subscribed", subscription: user.subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Subscribe failed" });
  }
});

router.get("/subscription-status", authMiddleware, async (req, res) => {
  const user = req.user;
  res.json({ subscription: user.subscription || { plan: "free" } });
});

router.patch("/renew", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user.subscription || user.subscription.plan === "free") return res.status(400).json({ error: "Nothing to renew" });

    const now = new Date();
    const isExpired = !user.subscription.expiryDate || now > user.subscription.expiryDate;
    const start = isExpired ? now : user.subscription.startDate;
    const expiry = addDays(now, PLAN_DAYS);

    user.subscription.startDate = start;
    user.subscription.expiryDate = expiry;
    await user.save();

    res.json({ message: "Subscription renewed", subscription: user.subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Renew failed" });
  }
});

router.post("/cancel-subscription", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    user.subscription = { plan: "free" };
    await user.save();
    res.json({ message: "Canceled subscription. Moved to free plan." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cancel failed" });
  }
});

module.exports = router;
