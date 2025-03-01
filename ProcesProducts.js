let Input = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 20 },
];

function processProduct() {
  let result = Input.map((ele, i) => {
    return ele.name;
  });
  let logged = result.forEach((ele, i) => {
    console.log(ele, "is above $50");
  });
}
processProduct(Input);
