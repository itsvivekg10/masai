interface State {
  handle(context: TrafficLight): void;
  getName(): string;
}


class RedLight implements State {
  handle(context: TrafficLight): void {
    console.log("🟥 Red Light: Vehicles must stop.");
    context.setState(new GreenLight()); 
  }
  getName(): string {
    return "Red";
  }
}

class GreenLight implements State {
  handle(context: TrafficLight): void {
    console.log("🟩 Green Light: Vehicles can move.");
    context.setState(new YellowLight()); 
  }
  getName(): string {
    return "Green";
  }
}

class YellowLight implements State {
  handle(context: TrafficLight): void {
    console.log("🟨 Yellow Light: Vehicles should slow down.");
    context.setState(new RedLight()); // Next → Red
  }
  getName(): string {
    return "Yellow";
  }
}


class TrafficLight {
  private currentState: State;

  constructor() {
    this.currentState = new RedLight();
  }

  setState(state: State): void {
    this.currentState = state;
  }

  change(): void {
    this.currentState.handle(this);
  }

  showState(): void {
    console.log(`Current Light: ${this.currentState.getName()}`);
  }
}


const trafficLight = new TrafficLight();

for (let i = 0; i < 6; i++) {
  trafficLight.showState();
  trafficLight.change();
  console.log("--------------------");
}
