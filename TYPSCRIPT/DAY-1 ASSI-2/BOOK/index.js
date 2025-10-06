var Book = /** @class */ (function () {
    function Book(title, author, price) {
        this.title = title,
            this.author = author,
            this.price = price;
    }
    return Book;
}());
var book1 = new Book("alchemist", "rajaji", 134);
console.log(book1);
