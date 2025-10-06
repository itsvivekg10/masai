var Student = /** @class */ (function () {
    function Student(name, age, roll) {
        this.name = name;
        this.age = age;
        this.roll = roll;
    }
    Student.prototype.displayDetails = function () {
        return "name:".concat(this.name, "; age:").concat(this.age, ";roll.no:").concat(this.roll, "  ");
    };
    return Student;
}());
var Student1 = new Student("vivek", 22, 123);
var Student2 = new Student("vivek2", 21, 121);
console.log(Student1.displayDetails());
console.log(Student2.displayDetails());
