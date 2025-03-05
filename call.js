let obj = {
  name: "vivek",
  age: "37",
};
function personalInfo(obj) {
  let res = `hello ${this.name} and age is ${this.age}`;
  console.log(res);
}
personalInfo.call(obj);
