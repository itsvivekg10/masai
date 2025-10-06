var Person = /** @class */ (function () {
    function Person(userName, age) {
        this.userName = userName;
        this.age = age;
    }
    Person.prototype.greet = function () {
        return "hello my name is ".concat(this.userName, " and my age is ").concat(this.age);
    };
    return Person;
}());
var person1 = new Person("rahul", 19);
console.log(person1.greet());
