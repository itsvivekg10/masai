const express = require("express");
const { auth } = require("../middleware/auth");
const { getBooks, setBooks, nextId } = require("../models/db");
const { redisClient } = require("../config/redis");
const { keyBooksCache, keyBulkList, BULK_USERS_SET } = require("../utils/keys");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const cacheKey = keyBooksCache(req.user.id);
  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json({ source: "cache", data: JSON.parse(cached) });

  const data = getBooks(req.user.id);
  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 });
  res.json({ source: "db", data });
});

router.post("/", auth, async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) return res.status(400).json({ error: "title & author required" });

  const book = { id: nextId(req.user.id), title, author, year };
  const arr = getBooks(req.user.id);
  arr.push(book);
  setBooks(req.user.id, arr);

  await redisClient.del(keyBooksCache(req.user.id));
  res.status(201).json(book);
});

// PUT /books/:id
router.put("/:id", auth, async (req, res) => {
  const arr = getBooks(req.user.id);
  const idx = arr.findIndex((b) => b.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  Object.assign(arr[idx], req.body);
  setBooks(req.user.id, arr);
  await redisClient.del(keyBooksCache(req.user.id));
  res.json(arr[idx]);
});

router.delete("/:id", auth, async (req, res) => {
  const arr = getBooks(req.user.id);
  const idx = arr.findIndex((b) => b.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const [deleted] = arr.splice(idx, 1);
  setBooks(req.user.id, arr);
  await redisClient.del(keyBooksCache(req.user.id));
  res.json(deleted);
});

router.post("/bulk", auth, async (req, res) => {
  const books = req.body.books;
  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ error: "Array of books required" });
  }

  await redisClient.rPush(keyBulkList(req.user.id), JSON.stringify(books));
  await redisClient.sAdd(BULK_USERS_SET, String(req.user.id));
  res.json({ message: "Books will be added later" });
});

module.exports = router;
