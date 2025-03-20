function createBook(title, author) {
  let obj = {};
  (obj.title = title),
    (obj.author = author),
    (obj.printInfo = function () {
      console.log("Book: " + this.title + ", Author: " + this.author);
    });
  return obj;
}

const book = createBook("1984", "George Orwell");
book.printInfo();
