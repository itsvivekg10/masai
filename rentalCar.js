function car(make, model, year, boolean) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isAvailable = boolean;
}

function customer(name) {
  this.name = name;
  this.rentalCar = [];
}
customer.prototype.rentedCar = function (car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentalCar.push(car);
  } else {
    console.log("car is not avail.....");
  }
};
let car1 = new car("Toyota", "Harier", 2022, true);

let customer1 = new customer("harish");
customer1.rentedCar(car1);
console.log(customer1);
console.log(car1);
