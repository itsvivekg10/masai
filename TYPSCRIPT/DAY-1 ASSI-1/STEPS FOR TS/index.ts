
// Solution : 
function add(a: number, b: number): number {
  return a + b;
}

let result = add(10, 5);  // Correct: Both arguments are numbers
console.log(result);  // Output: 15

let invalidResult = add(10, 5);  // Error: Argument of type 'string' is not assignable to parameter of type 'number'
