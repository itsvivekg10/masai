const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel"); // ✅ you forgot this import

async function addUser(req, res) {
  try {
    const newUser = await userModel.create(req.body);
    res.status(200).json({ res: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function borrowedBook(req, res) {
  try {
    let { bookid } = req.body;
    let { id } = req.params;

    if (id) {
      let user = await userModel.findById(id);
      if (user) {
        let book = await bookModel.findById(bookid);
        if (book) {
          user.rentedBooks.push(bookid);
          book.rentedBy.push(id);

          await user.save();
          await book.save();

          res.status(200).json({ message: "Book borrowed successfully" });
        } else {
          res.status(404).json({ res: "book not found" });
        }
      } else {
        res.status(404).json({ res: "not found user" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

// ✅ export both functions
module.exports = {
  addUser,
  borrowedBook,
};
