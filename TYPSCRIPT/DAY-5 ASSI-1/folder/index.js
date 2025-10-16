var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var State = /** @class */ (function () {
    function State() {
    }
    State.prototype.insertCoin = function () {
        throw new Error("This method must be overridden!");
    };
    State.prototype.selectProduct = function () {
        throw new Error("This method must be overridden!");
    };
    State.prototype.dispense = function () {
        throw new Error("This method must be overridden!");
    };
    return State;
}());
var IdleState = /** @class */ (function (_super) {
    __extends(IdleState, _super);
    function IdleState(machine) {
        var _this = _super.call(this) || this;
        _this.machine = machine;
        return _this;
    }
    IdleState.prototype.insertCoin = function () {
        console.log("Coin inserted. Moving to Processing state...");
        this.machine.setState(this.machine.processingState);
    };
    IdleState.prototype.selectProduct = function () {
        console.log("You must insert a coin first.");
    };
    IdleState.prototype.dispense = function () {
        console.log("Nothing to dispense. Insert a coin first.");
    };
    return IdleState;
}(State));
var ProcessingState = /** @class */ (function (_super) {
    __extends(ProcessingState, _super);
    function ProcessingState(machine) {
        var _this = _super.call(this) || this;
        _this.machine = machine;
        return _this;
    }
    ProcessingState.prototype.insertCoin = function () {
        console.log("Coin already inserted. Please select a product.");
    };
    ProcessingState.prototype.selectProduct = function () {
        console.log("Product selected. Moving to Dispensing state...");
        this.machine.setState(this.machine.dispensingState);
    };
    ProcessingState.prototype.dispense = function () {
        console.log("You need to select a product first.");
    };
    return ProcessingState;
}(State));
var DispensingState = /** @class */ (function (_super) {
    __extends(DispensingState, _super);
    function DispensingState(machine) {
        var _this = _super.call(this) || this;
        _this.machine = machine;
        return _this;
    }
    DispensingState.prototype.insertCoin = function () {
        console.log("Please wait, dispensing in progress...");
    };
    DispensingState.prototype.selectProduct = function () {
        console.log("Already dispensing your product...");
    };
    DispensingState.prototype.dispense = function () {
        console.log("Dispensing product...");
        this.machine.setState(this.machine.idleState);
        console.log("Returning to Idle state.");
    };
    return DispensingState;
}(State));
var VendingMachine = /** @class */ (function () {
    function VendingMachine() {
        this.idleState = new IdleState(this);
        this.processingState = new ProcessingState(this);
        this.dispensingState = new DispensingState(this);
        this.currentState = this.idleState;
    }
    VendingMachine.prototype.setState = function (state) {
        this.currentState = state;
    };
    VendingMachine.prototype.insertCoin = function () {
        this.currentState.insertCoin();
    };
    VendingMachine.prototype.selectProduct = function () {
        this.currentState.selectProduct();
    };
    VendingMachine.prototype.dispense = function () {
        this.currentState.dispense();
    };
    return VendingMachine;
}());
var machine = new VendingMachine();
machine.insertCoin();
machine.selectProduct();
machine.dispense();
