let unknownValue: String = "Hello, TypeScript!";
let anyValue: String = "Hello, TypeScript!";

// 1. What will happen if we call `.toUpperCase()` on both values?
console.log(unknownValue.toUpperCase());  // What will happen here?
console.log(anyValue.toUpperCase());     // What will happen here?

// 2. 
let myValue: number = 100;
console.log(myValue + 1);  // What will happen here?
