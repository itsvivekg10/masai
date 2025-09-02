const express = require("express");
const fs = require("fs").promises; 
const app = express();
const PORT = 3000;

app.use(express.json()); 

const readDB = async () => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
};

const writeDB = async (data) => {
  await fs.writeFile("db.json", JSON.stringify(data, null, 2));
};


app.post("/books", async (req, res) => {
  try {
    const books = await readDB();
    const newBook = req.body;

    if (!newBook.id || !newBook.title || !newBook.author || !newBook.year) {
      return res.status(400).json({ message: "All book fields are required" });
    }

    books.push(newBook);
    await writeDB(books);

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(500).json({ message: "Failed to add book" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await readDB();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const books = await readDB();
    const book = books.find((b) => b.id == req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch book" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const books = await readDB();
    const index = books.findIndex((b) => b.id == req.params.id);

    if (index === -1) return res.status(404).json({ message: "Book not found" });

    books[index] = { ...books[index], ...req.body };
    await writeDB(books);

    res.status(200).json({ message: "Book updated successfully", book: books[index] });
  } catch (err) {
    res.status(500).json({ message: "Failed to update book" });
  }
});

// DELETE /books/:id → Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const books = await readDB();
    const newBooks = books.filter((b) => b.id != req.params.id);

    if (newBooks.length === books.length)
      return res.status(404).json({ message: "Book not found" });

    await writeDB(newBooks);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book" });
  }
});

// GET /books/search → Search by author or title
app.get("/books/search", async (req, res) => {
  try {
    const { author, title } = req.query;
    const books = await readDB();

    let results = books;

    if (author) {
      const authorLower = author.toLowerCase();
      results = results.filter((b) => b.author.toLowerCase().includes(authorLower));
    }

    if (title) {
      const titleLower = title.toLowerCase();
      results = results.filter((b) => b.title.toLowerCase().includes(titleLower));
    }

    if (!results.length) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
