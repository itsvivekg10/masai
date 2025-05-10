const students = [
  { name: "Alice", subject: "Math", score: 85 },
  { name: "Bob", subject: "Math", score: 92 },
  { name: "Charlie", subject: "Science", score: 78 },
  { name: "David", subject: "Math", score: 88 },
  { name: "Eve", subject: "Science", score: 91 },
  { name: "Frank", subject: "Math", score: 74 },
  { name: "Grace", subject: "Science", score: 80 },
];
let name = students.map((ele) => {
  return ele.name;
});
console.log(name);
let topper = students.filter((ele) => ele.score > 80);
console.log(topper);
let summ = students.reduce((acc, curr) => {
  return acc + curr.score;
}, 0);
console.log(summ);
let sortRes = students.sort((a, b) => a.score - b.score);
console.log(sortRes);
