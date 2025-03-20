function createLibrary() {
  let books = [];
  return {
    addBook: function (title, author) {
      let obj = {};
      (obj.title = title), (obj.author = author);

      books.push(obj);
    },

    getBooks: function () {
      return books;
    },
  };
}

const library = createLibrary();
// book1= book
library.addBook(1980, "georgeWell");
console.log(library.getBooks());
