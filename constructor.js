function Person(n, num) {
  let name = n;
  let age = num;
  function displayInfo() {
    console.log(`${name} age is ${age}`);
  }
  return displayInfo();
}
Person("vivek", 20);
