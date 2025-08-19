const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("redis");

const app = express();
app.use(bodyParser.json());

// 🚀 In-memory "database"
let items = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" }
];

// 🚀 Redis Client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Middleware to log
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// GET /items → with caching
app.get("/items", async (req, res) => {
  try {
    const cacheKey = "items:all";

    // 1. Check cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("✅ Returning from cache");
      return res.json(JSON.parse(cachedData));
    }
    console.log("⚡ Fetching from DB");
    await redisClient.set(cacheKey, JSON.stringify(items), { EX: 60 }); 
    return res.json(items);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/items", async (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);

  await redisClient.del("items:all");
  console.log("🗑️ Cache invalidated after add");

  res.status(201).json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let item = items.find((it) => it.id === parseInt(id));
  if (!item) return res.status(404).send("Item not found");

  item.name = name;

  await redisClient.del("items:all");
  console.log("🗑️ Cache invalidated after update");

  res.json(item);
});

app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((it) => it.id === parseInt(id));
  if (index === -1) return res.status(404).send("Item not found");

  const deleted = items.splice(index, 1);

  await redisClient.del("items:all");
  console.log("🗑️ Cache invalidated after delete");

  res.json(deleted[0]);
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
