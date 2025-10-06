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
var vechiles = /** @class */ (function () {
    function vechiles(brand, speed) {
        this.brand = brand,
            this.speed = speed;
    }
    vechiles.prototype.drive = function () {
        console.log("this car run at the speed of ".concat(this.speed));
    };
    return vechiles;
}());
var car = /** @class */ (function (_super) {
    __extends(car, _super);
    function car(brand, speed, fuelType) {
        var _this = _super.call(this, brand, speed) || this;
        _this.fuelType = fuelType;
        return _this;
    }
    car.prototype.fuelRefiel = function () {
        console.log("this car is ".concat(this.brand, " run at the speed of ").concat(this.speed, " per hr and fuel is ").concat(this.fuelType));
    };
    return car;
}(vechiles));
var car1 = new car("rangerover", 2000, 'prtrol');
console.log(car1.fuelRefiel());
