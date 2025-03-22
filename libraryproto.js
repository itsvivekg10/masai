function book(title, author, isAvailable) {
  this.title = title;
  this.author = author;
  this.isAvailable = isAvailable;
}
// let book1= new book("jafar","kamal",true)
// let book2= new book("TheAlchemist","lily",false)
function member(name) {
  this.name = name;
  this.books = [];
  this.isPrem = false;
}

member.prototype.bookBorrow = function (book) {
  let max = this.isPrem ? 5 : 3;
  if (this.books.length < max) {
    if (book.isAvailable) {
      book.isAvailable = false;

      this.books.push(book);
    } else {
      console.log(`Sorry ${this.name} the book is not available....`);
    }
  } else {
    console.log(`sorry ${this.name} you have reachout your limit`);
  }
};

// function premeiumMember(member){
//     this.name=member.name
//     this.books=member.books
// }
// let premeiumMember1= new premeiumMember(member1)
// console.log(premeiumMember1)

let book1 = new book("jafar", "kamal", true);
let book2 = new book("TheAlchemist", "lily", true);
let book3 = new book("TheAlchemist", "lily", true);
let book4 = new book("TheAlchemist", "lily", true);
let member1 = new member("rahul");
member1.bookBorrow(book1);
member1.bookBorrow(book2);

member1.bookBorrow(book3);
member1.bookBorrow(book4);
console.log(member1);
class premeiumMember extends member {
  constructor(mem) {
    super(mem.name);
    this.isPrem = true;
    this.books = mem.books;
  }
}

let premeiumMember1 = new premeiumMember(member1);

console.log(premeiumMember1);
