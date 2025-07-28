let v = 1;
let num = 1;
function factorial() {
  if (v === 5) return num;
  v++;
  num = num * v;

  return factorial();
}
factorial();
console.log(num);
