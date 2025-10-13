// Step 1: Define interface
interface IVehicle {
  start(): void;
}

// Step 2: Car class implementing IVehicle
class Car implements IVehicle {
  start(): void {
    console.log("Car is starting");
  }
}

// Step 3: Bike class implementing IVehicle
class Bike implements IVehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

class Driver {
  private vehicle: IVehicle;

  constructor(vehicle: IVehicle) {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Step 5: Test
const carDriver = new Driver(new Car());
carDriver.drive();

const bikeDriver = new Driver(new Bike());
bikeDriver.drive();
