class Bird {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  eat(): void {
    console.log(`${this.name} is eating.`);
  }
}

interface Flyable {
  fly(): void;
}

class Sparrow extends Bird implements Flyable {
  fly(): void {
    console.log(`${this.name} is flying.`);
  }
}

class Ostrich extends Bird {
}

const sparrow = new Sparrow("Jack");
sparrow.eat(); 
sparrow.fly(); 

const ostrich = new Ostrich("Olly");
ostrich.eat(); 