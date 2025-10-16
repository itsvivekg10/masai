class State {
  insertCoin() {
    throw new Error("This method must be overridden!");
  }
  selectProduct() {
    throw new Error("This method must be overridden!");
  }
  dispense() {
    throw new Error("This method must be overridden!");
  }
}

class IdleState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertCoin() {
    console.log("Coin inserted. Moving to Processing state...");
    this.machine.setState(this.machine.processingState);
  }

  selectProduct() {
    console.log("You must insert a coin first.");
  }

  dispense() {
    console.log("Nothing to dispense. Insert a coin first.");
  }
}

class ProcessingState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertCoin() {
    console.log("Coin already inserted. Please select a product.");
  }

  selectProduct() {
    console.log("Product selected. Moving to Dispensing state...");
    this.machine.setState(this.machine.dispensingState);
  }

  dispense() {
    console.log("You need to select a product first.");
  }
}

class DispensingState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertCoin() {
    console.log("Please wait, dispensing in progress...");
  }

  selectProduct() {
    console.log("Already dispensing your product...");
  }

  dispense() {
    console.log("Dispensing product...");
    this.machine.setState(this.machine.idleState);
    console.log("Returning to Idle state.");
  }
}

class VendingMachine {
  constructor() {
    this.idleState = new IdleState(this);
    this.processingState = new ProcessingState(this);
    this.dispensingState = new DispensingState(this);

    this.currentState = this.idleState; 
  }

  setState(state) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin();
  }

  selectProduct() {
    this.currentState.selectProduct();
  }

  dispense() {
    this.currentState.dispense();
  }
}

const machine = new VendingMachine();

machine.insertCoin();    
machine.selectProduct(); 
machine.dispense();       
