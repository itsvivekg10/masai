const library = {
  books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

  addBook(book) {
    if (!book.title || !book.author || !book.year) {
      console.log("Book information is incomplete.");

      return;
    }
    this.books.push(book);
  },

  findBookByTitle(title) {
    this.books.find((book) => book.title === title);

    console.log(`yes ${title} is present`);
  },

  removeBook: function (title) {
    const index = this.books.findIndex((book) => book.title === title);

    if (index !== -1) {
      this.books.splice(index, 1);
      console.log("Book not found.");
    }
  },
};

library.addBook({ title: "xx", author: "George Orwell", year: 1949 });
library.findBookByTitle("xx");
library.removeBook("xx");
console.log(library.books.length);
