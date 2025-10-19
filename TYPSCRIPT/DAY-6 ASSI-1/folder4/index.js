var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Book = /** @class */ (function () {
    function Book(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    Book.prototype.clone = function () {
        var clonedReviews = __spreadArray([], this.reviews, true);
        return new Book(this.title, this.author, clonedReviews);
    };
    Book.prototype.getDetails = function () {
        return "Book: ".concat(this.title, ", Author: ").concat(this.author, ", Reviews: [").concat(this.reviews.join(", "), "]");
    };
    return Book;
}());
function main() {
    var original = new Book("Design Patterns", "GoF", [
        "Excellent book!",
        "Very informative.",
    ]);
    var clone = original.clone();
    clone.reviews.push("Must read for developers!");
    console.log("Original Book:", original.getDetails());
    console.log("Cloned Book:", clone.getDetails());
    console.log("Are they the same instance?", original === clone);
}
main();
