// Step 2: Concrete States
var IdleState = /** @class */ (function () {
    function IdleState() {
    }
    IdleState.prototype.insertCard = function (context) {
        console.log("💳 Card inserted. Please enter your PIN.");
        context.setState(new CardInsertedState());
    };
    IdleState.prototype.enterPin = function (context, pin) {
        console.log("❌ No card inserted. Please insert your card first.");
    };
    IdleState.prototype.withdrawCash = function (context, amount) {
        console.log("❌ Insert your card first.");
    };
    IdleState.prototype.dispenseCash = function (context) {
        console.log("❌ No transaction in progress.");
    };
    IdleState.prototype.getName = function () {
        return "Idle";
    };
    return IdleState;
}());
var CardInsertedState = /** @class */ (function () {
    function CardInsertedState() {
    }
    CardInsertedState.prototype.insertCard = function (context) {
        console.log("❌ Card already inserted.");
    };
    CardInsertedState.prototype.enterPin = function (context, pin) {
        if (pin === 1234) {
            console.log("✅ PIN verified. You can now withdraw cash.");
            context.setState(new AuthenticatedState());
        }
        else {
            console.log("❌ Incorrect PIN. Ejecting card...");
            context.setState(new IdleState());
        }
    };
    CardInsertedState.prototype.withdrawCash = function (context, amount) {
        console.log("❌ Enter PIN before withdrawing cash.");
    };
    CardInsertedState.prototype.dispenseCash = function (context) {
        console.log("❌ PIN verification required first.");
    };
    CardInsertedState.prototype.getName = function () {
        return "CardInserted";
    };
    return CardInsertedState;
}());
var AuthenticatedState = /** @class */ (function () {
    function AuthenticatedState() {
    }
    AuthenticatedState.prototype.insertCard = function (context) {
        console.log("❌ Transaction in progress. Please finish current session.");
    };
    AuthenticatedState.prototype.enterPin = function (context, pin) {
        console.log("✅ PIN already verified.");
    };
    AuthenticatedState.prototype.withdrawCash = function (context, amount) {
        console.log("\uD83D\uDCB0 Withdrawing \u20B9".concat(amount, "..."));
        context.setState(new DispensingCashState());
    };
    AuthenticatedState.prototype.dispenseCash = function (context) {
        console.log("❌ Please initiate a withdrawal first.");
    };
    AuthenticatedState.prototype.getName = function () {
        return "Authenticated";
    };
    return AuthenticatedState;
}());
var DispensingCashState = /** @class */ (function () {
    function DispensingCashState() {
    }
    DispensingCashState.prototype.insertCard = function (context) {
        console.log("❌ Currently dispensing cash. Please wait.");
    };
    DispensingCashState.prototype.enterPin = function (context, pin) {
        console.log("❌ Cash is being dispensed.");
    };
    DispensingCashState.prototype.withdrawCash = function (context, amount) {
        console.log("❌ Already dispensing cash.");
    };
    DispensingCashState.prototype.dispenseCash = function (context) {
        console.log("💸 Dispensing cash... Please take your money.");
        console.log("🔁 Returning to idle state.");
        context.setState(new IdleState()); // ✅ FIX: return to Idle after dispensing
    };
    DispensingCashState.prototype.getName = function () {
        return "DispensingCash";
    };
    return DispensingCashState;
}());
// Step 3: Context (ATM)
var ATM = /** @class */ (function () {
    function ATM() {
        this.currentState = new IdleState(); // initial state
    }
    ATM.prototype.setState = function (state) {
        this.currentState = state;
    };
    ATM.prototype.insertCard = function () {
        this.currentState.insertCard(this);
    };
    ATM.prototype.enterPin = function (pin) {
        this.currentState.enterPin(this, pin);
    };
    ATM.prototype.withdrawCash = function (amount) {
        this.currentState.withdrawCash(this, amount);
    };
    ATM.prototype.dispenseCash = function () {
        this.currentState.dispenseCash(this);
    };
    ATM.prototype.showState = function () {
        console.log("\uD83C\uDFE7 Current State: ".concat(this.currentState.getName()));
    };
    return ATM;
}());
// Step 4: Test the ATM workflow
var atm = new ATM();
// --- Simulation ---
atm.showState();
atm.insertCard();
atm.enterPin(1234); // correct PIN
atm.withdrawCash(5000);
atm.dispenseCash();
atm.showState(); // should return to Idle ✅
