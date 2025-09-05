const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function getAllBooks() {
  const db = readDB();
  return db.books || [];
}

function getBookById(id) {
  const books = getAllBooks();
  return books.find(b => b.id === id) || null;
}

function addBook(book) {
  const db = readDB();
  const books = db.books || [];
  // assign id (max id + 1)
  const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = Object.assign({ id: nextId }, book, {
    status: book.status || 'available',
    borrowedBy: null,
    borrowedDate: null
  });
  books.push(newBook);
  db.books = books;
  writeDB(db);
  return newBook;
}

function updateBook(id, updates) {
  const db = readDB();
  const idx = (db.books || []).findIndex(b => b.id === id);
  if (idx === -1) return null;
  db.books[idx] = { ...db.books[idx], ...updates };
  writeDB(db);
  return db.books[idx];
}

function deleteBook(id) {
  const db = readDB();
  const idx = (db.books || []).findIndex(b => b.id === id);
  if (idx === -1) return false;
  db.books.splice(idx, 1);
  writeDB(db);
  return true;
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
