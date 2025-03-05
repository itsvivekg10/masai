function createTree(n) {
  for (let i = 1; i <= n - 1; i++) {
    let temp = "";
    for (let j = 1; j <= n - 1 - i; j++) {
      temp = temp + "  ";
    }
    for (let j = 1; j <= i * 2 - 1; j++) {
      temp = temp + "* ";
    }
    console.log(temp);
  }
  let tem = "";
  for (let i = 1; i < n - 1 - 1; i++) {
    tem = tem + "  ";
  }
  for (let i = 1; i <= 1; i++) {
    tem = tem + "  |";
  }
  console.log(tem);
}
createTree(5);
