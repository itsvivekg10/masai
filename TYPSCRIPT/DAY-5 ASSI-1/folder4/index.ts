// Step 1: Define the State interface
interface ATMState {
  insertCard(context: ATM): void;
  enterPin(context: ATM, pin: number): void;
  withdrawCash(context: ATM, amount: number): void;
  dispenseCash(context: ATM): void;
  getName(): string;
}

// Step 2: Concrete States

class IdleState implements ATMState {
  insertCard(context: ATM): void {
    console.log("💳 Card inserted. Please enter your PIN.");
    context.setState(new CardInsertedState());
  }

  enterPin(context: ATM, pin: number): void {
    console.log("❌ No card inserted. Please insert your card first.");
  }

  withdrawCash(context: ATM, amount: number): void {
    console.log("❌ Insert your card first.");
  }

  dispenseCash(context: ATM): void {
    console.log("❌ No transaction in progress.");
  }

  getName(): string {
    return "Idle";
  }
}

class CardInsertedState implements ATMState {
  insertCard(context: ATM): void {
    console.log("❌ Card already inserted.");
  }

  enterPin(context: ATM, pin: number): void {
    if (pin === 1234) {
      console.log("✅ PIN verified. You can now withdraw cash.");
      context.setState(new AuthenticatedState());
    } else {
      console.log("❌ Incorrect PIN. Ejecting card...");
      context.setState(new IdleState());
    }
  }

  withdrawCash(context: ATM, amount: number): void {
    console.log("❌ Enter PIN before withdrawing cash.");
  }

  dispenseCash(context: ATM): void {
    console.log("❌ PIN verification required first.");
  }

  getName(): string {
    return "CardInserted";
  }
}

class AuthenticatedState implements ATMState {
  insertCard(context: ATM): void {
    console.log("❌ Transaction in progress. Please finish current session.");
  }

  enterPin(context: ATM, pin: number): void {
    console.log("✅ PIN already verified.");
  }

  withdrawCash(context: ATM, amount: number): void {
    console.log(`💰 Withdrawing ₹${amount}...`);
    context.setState(new DispensingCashState());
  }

  dispenseCash(context: ATM): void {
    console.log("❌ Please initiate a withdrawal first.");
  }

  getName(): string {
    return "Authenticated";
  }
}

class DispensingCashState implements ATMState {
  insertCard(context: ATM): void {
    console.log("❌ Currently dispensing cash. Please wait.");
  }

  enterPin(context: ATM, pin: number): void {
    console.log("❌ Cash is being dispensed.");
  }

  withdrawCash(context: ATM, amount: number): void {
    console.log("❌ Already dispensing cash.");
  }

  dispenseCash(context: ATM): void {
    console.log("💸 Dispensing cash... Please take your money.");
    console.log("🔁 Returning to idle state.");
    context.setState(new IdleState()); // ✅ FIX: return to Idle after dispensing
  }

  getName(): string {
    return "DispensingCash";
  }
}

// Step 3: Context (ATM)

class ATM {
  private currentState: ATMState;

  constructor() {
    this.currentState = new IdleState(); // initial state
  }

  setState(state: ATMState): void {
    this.currentState = state;
  }

  insertCard(): void {
    this.currentState.insertCard(this);
  }

  enterPin(pin: number): void {
    this.currentState.enterPin(this, pin);
  }

  withdrawCash(amount: number): void {
    this.currentState.withdrawCash(this, amount);
  }

  dispenseCash(): void {
    this.currentState.dispenseCash(this);
  }

  showState(): void {
    console.log(`🏧 Current State: ${this.currentState.getName()}`);
  }
}

// Step 4: Test the ATM workflow

const atm = new ATM();

// --- Simulation ---
atm.showState();
atm.insertCard();
atm.enterPin(1234); // correct PIN
atm.withdrawCash(5000);
atm.dispenseCash();
atm.showState(); // should return to Idle ✅
