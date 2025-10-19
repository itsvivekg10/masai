
class Car {
  readonly brand: string;
  readonly engine: string;
  readonly color: string;
  readonly sunroof: boolean;
  readonly automaticTransmission: boolean;

  constructor(builder: CarBuilder) {
    this.brand = builder.getBrand();
    this.engine = builder.getEngine();
    this.color = builder.getColor();
    this.sunroof = builder.hasSunroof();
    this.automaticTransmission = builder.hasAutomaticTransmission();
  }
  getDetails(): string {
    return `
Car Details:
  Brand: ${this.brand}
  Engine: ${this.engine}
  Color: ${this.color}
  Sunroof: ${this.sunroof ? "Yes" : "No"}
  Automatic Transmission: ${this.automaticTransmission ? "Yes" : "No"}
`;
  }
}
class CarBuilder {
  private brand: string = "";
  private engine: string = "";
  private color: string = "";
  private sunroof: boolean = false;
  private automaticTransmission: boolean = false;

  setBrand(brand: string): CarBuilder {
    this.brand = brand;
    return this;
  }

  setEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  setColor(color: string): CarBuilder {
    this.color = color;
    return this;
  }

  addSunroof(): CarBuilder {
    this.sunroof = true;
    return this;
  }

  addAutomaticTransmission(): CarBuilder {
    this.automaticTransmission = true;
    return this;
  }

  getBrand(): string {
    return this.brand;
  }

  getEngine(): string {
    return this.engine;
  }

  getColor(): string {
    return this.color;
  }

  hasSunroof(): boolean {
    return this.sunroof;
  }

  hasAutomaticTransmission(): boolean {
    return this.automaticTransmission;
  }
  build(): Car {
    return new Car(this);
  }
}

function main(): void {
  const tesla = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .addAutomaticTransmission()
    .build();

  console.log(tesla.getDetails());
}

main();
