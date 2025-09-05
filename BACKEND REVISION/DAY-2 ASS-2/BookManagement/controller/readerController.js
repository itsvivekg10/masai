const bookModel = require('../models/bookModel');
const transactionLogger = require('../middleware/transactionLogger');

function getAvailableBooks(req, res) {
  const books = bookModel.getAllBooks().filter(b => b.status === 'available');
  return res.json(books);
}

function borrowBook(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid book id' });

  const { readerName } = req.body;
  if (!readerName) return res.status(400).json({ error: 'readerName is required' });

  const book = bookModel.getBookById(id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (book.status !== 'available') {
    return res.status(409).json({ error: 'Book is not available for borrowing' });
  }

  const nowISO = new Date().toISOString().slice(0, 10); 
  const updates = {
    status: 'borrowed',
    borrowedBy: readerName,
    borrowedDate: nowISO
  };

  const updated = bookModel.updateBook(id, updates);

  transactionLogger.logBorrow(readerName, updated.title);

  return res.json(updated);
}

function returnBook(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid book id' });

  const book = bookModel.getBookById(id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (book.status !== 'borrowed') {
    return res.status(400).json({ error: 'Book is not currently borrowed' });
  }

  const readerName = book.borrowedBy || 'Unknown';

  const updates = {
    status: 'available',
    borrowedBy: null,
    borrowedDate: null
  };

  const updated = bookModel.updateBook(id, updates);

  transactionLogger.logReturn(readerName, book.title);

  return res.json(updated);
}

module.exports = {
  getAvailableBooks,
  borrowBook,
  returnBook
};
