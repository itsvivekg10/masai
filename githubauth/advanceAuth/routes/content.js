const express = require("express");
const Content = require("../models/Content");
const { authMiddleware, requireRole } = require("../middleware/auth");
const router = express.Router();

router.get("/free", async (req, res) => {
  const items = await Content.find({ category: "free" }).sort({ createdAt: -1 });
  res.json({ items });
});

router.get("/premium", authMiddleware, async (req, res) => {
  const plan = req.user.subscription?.plan || "free";
  if (!["premium","pro"].includes(plan)) return res.status(403).json({ error: "Upgrade to premium to access" });

  const items = await Content.find({ category: "premium" }).sort({ createdAt: -1 });
  res.json({ items });
});

router.post("/", authMiddleware, requireRole("admin"), async (req, res) => {
  const { title, body, category } = req.body;
  if (!["free","premium"].includes(category)) return res.status(400).json({ error: "Invalid category" });
  const c = await Content.create({ title, body, category, createdBy: req.user._id });
  res.status(201).json({ content: c });
});

router.delete("/:id", authMiddleware, requireRole("admin"), async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
