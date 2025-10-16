var RedLight = /** @class */ (function () {
    function RedLight() {
    }
    RedLight.prototype.handle = function (context) {
        console.log("🟥 Red Light: Vehicles must stop.");
        context.setState(new GreenLight());
    };
    RedLight.prototype.getName = function () {
        return "Red";
    };
    return RedLight;
}());
var GreenLight = /** @class */ (function () {
    function GreenLight() {
    }
    GreenLight.prototype.handle = function (context) {
        console.log("🟩 Green Light: Vehicles can move.");
        context.setState(new YellowLight());
    };
    GreenLight.prototype.getName = function () {
        return "Green";
    };
    return GreenLight;
}());
var YellowLight = /** @class */ (function () {
    function YellowLight() {
    }
    YellowLight.prototype.handle = function (context) {
        console.log("🟨 Yellow Light: Vehicles should slow down.");
        context.setState(new RedLight()); // Next → Red
    };
    YellowLight.prototype.getName = function () {
        return "Yellow";
    };
    return YellowLight;
}());
var TrafficLight = /** @class */ (function () {
    function TrafficLight() {
        this.currentState = new RedLight();
    }
    TrafficLight.prototype.setState = function (state) {
        this.currentState = state;
    };
    TrafficLight.prototype.change = function () {
        this.currentState.handle(this);
    };
    TrafficLight.prototype.showState = function () {
        console.log("Current Light: ".concat(this.currentState.getName()));
    };
    return TrafficLight;
}());
var trafficLight = new TrafficLight();
for (var i = 0; i < 6; i++) {
    trafficLight.showState();
    trafficLight.change();
    console.log("--------------------");
}
