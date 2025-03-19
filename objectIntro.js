function createEmployee(name, role, salary) {
  (this.name = name), (this.role = role), (this.salary = salary);
  this.introduce = function () {
    return `hello I am ${this.name} working as a ${this.role} `;
  };
}
let employee = new createEmployee("Alice", "Devloper", 80000);
console.log(employee.introduce());
