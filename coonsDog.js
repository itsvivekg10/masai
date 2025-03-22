class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} bhauuu bhauu`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}
let v = new Dog("rex");
console.log(v.speak());
