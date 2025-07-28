function createCounter() {
  let count = 0;
  function innerCounter() {
    count++;
    console.log(count);
  }
  return innerCounter;
}
let counter = createCounter();

counter();
counter();
counter();
