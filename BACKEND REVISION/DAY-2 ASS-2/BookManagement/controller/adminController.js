const bookModel = require('../models/bookModel');

function createBook(req, res) {
  const { title, author, genre, publishedYear, status } = req.body;
  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'title, author, genre and publishedYear are required' });
  }
  const book = {
    title,
    author,
    genre,
    publishedYear,
    status: status || 'available'
  };
  const created = bookModel.addBook(book);
  return res.status(201).json(created);
}

function getAllBooks(req, res) {
  const books = bookModel.getAllBooks();
  return res.json(books);
}

function patchBook(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid book id' });

  const existing = bookModel.getBookById(id);
  if (!existing) return res.status(404).json({ error: 'Book not found' });

  const updates = { ...req.body };
  const updated = bookModel.updateBook(id, updates);
  return res.json(updated);
}

function deleteBook(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid book id' });

  const ok = bookModel.deleteBook(id);
  if (!ok) return res.status(404).json({ error: 'Book not found' });
  return res.json({ message: 'Book deleted successfully' });
}

module.exports = {
  createBook,
  getAllBooks,
  patchBook,
  deleteBook
};
