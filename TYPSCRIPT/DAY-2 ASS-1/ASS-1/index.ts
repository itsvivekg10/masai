class Duck {
  swim(): void {
    console.log("I know swimming");
  }
}

class MallardDuck extends Duck {}

const mallard = new MallardDuck();
mallard.swim(); // Output: I know swimming
class Bird {
  fly(): void {
    console.log("I can fly");
  }
}

class Penguin extends Bird {
  // Overriding the fly() method
  fly(): void {
    console.log("I cannot fly");
  }
}

const bird = new Bird();
bird.fly(); // I can fly

const penguin = new Penguin();
penguin.fly(); // I cannot fly
// Defining interface
interface IDuck {
  swim(): void;
  fly(): void;
  sound(): void;
}

// Implementing the interface
class ToyDuck implements IDuck {
  fly(): void {
    console.log("Cannot fly");
  }

  sound(): void {
    console.log("Cannot sound");
  }

  swim(): void {
    console.log("Can float on water");
  }
}

const toyDuck = new ToyDuck();
toyDuck.fly();
toyDuck.sound();
toyDuck.swim();
