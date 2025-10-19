class Book {
  title: string;
  author: string;
  reviews: string[];

  constructor(title: string, author: string, reviews: string[]) {
    this.title = title;
    this.author = author;
    this.reviews = reviews;
  }

  clone(): Book {
    const clonedReviews = [...this.reviews];
    return new Book(this.title, this.author, clonedReviews);
  }

  getDetails(): string {
    return `Book: ${this.title}, Author: ${this.author}, Reviews: [${this.reviews.join(", ")}]`;
  }
}

function main(): void {
  const original = new Book("Design Patterns", "GoF", [
    "Excellent book!",
    "Very informative.",
  ]);

  const clone = original.clone();
  clone.reviews.push("Must read for developers!");

  console.log("Original Book:", original.getDetails());
  console.log("Cloned Book:", clone.getDetails());

  console.log("Are they the same instance?", original === clone);
}

main();
