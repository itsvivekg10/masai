// Step 1: Create Vehicle interface
interface Vehicle {
  start(): void;
}

// Step 2: Implement Bike and Car classes
class Bike implements Vehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

class Car implements Vehicle {
  start(): void {
    console.log("Car is starting");
  }
}

class Driver {
  private vehicle: Vehicle;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Step 4: Test
const bike = new Bike();
const car = new Car();

const driver = new Driver(bike);
driver.drive();

driver.setVehicle(car); 
driver.drive();
