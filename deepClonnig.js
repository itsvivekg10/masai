let Original = { name: "Alice", hobbies: ["reading", "traveling"] };

//Clone: { name: "Alice", hobbies: ["reading", "traveling", "coding"] }

function deepClone(ele) {
  Original.hobbies.push(ele);
}
deepClone("coding");
console.log(Original);
