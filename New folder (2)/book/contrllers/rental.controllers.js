const User = require("../models/user.model");
const Book = require("../models/book.model");

// Add User
exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add Book
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Rent Book
exports.rentBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book)
      return res.status(404).json({ message: "User or Book not found" });

    if (!user.rentedBooks.includes(bookId)) {
      user.rentedBooks.push(bookId);
      book.rentedBy.push(userId);
      await user.save();
      await book.save();
    }

    res.status(200).json({ message: "Book rented successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Return Book
exports.returnBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book)
      return res.status(404).json({ message: "User or Book not found" });

    user.rentedBooks = user.rentedBooks.filter(
      (id) => id.toString() !== bookId
    );
    book.rentedBy = book.rentedBy.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get User Rentals
exports.getUserRentals = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("rentedBooks");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Book Renters
exports.getBookRenters = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("rentedBy");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Remove from all users
    await User.updateMany(
      { rentedBooks: book._id },
      { $pull: { rentedBooks: book._id } }
    );

    res.json({ message: "Book deleted and users updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
