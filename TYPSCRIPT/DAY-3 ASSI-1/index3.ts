class PetrolEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}

class Car {
  engine: PetrolEngine = new PetrolEngine();
  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}

// Test
const car = new Car();
car.drive();
