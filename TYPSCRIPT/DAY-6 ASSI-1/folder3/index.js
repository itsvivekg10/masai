var Car = /** @class */ (function () {
    function Car(builder) {
        this.brand = builder.getBrand();
        this.engine = builder.getEngine();
        this.color = builder.getColor();
        this.sunroof = builder.hasSunroof();
        this.automaticTransmission = builder.hasAutomaticTransmission();
    }
    Car.prototype.getDetails = function () {
        return "\nCar Details:\n  Brand: ".concat(this.brand, "\n  Engine: ").concat(this.engine, "\n  Color: ").concat(this.color, "\n  Sunroof: ").concat(this.sunroof ? "Yes" : "No", "\n  Automatic Transmission: ").concat(this.automaticTransmission ? "Yes" : "No", "\n");
    };
    return Car;
}());
var CarBuilder = /** @class */ (function () {
    function CarBuilder() {
        this.brand = "";
        this.engine = "";
        this.color = "";
        this.sunroof = false;
        this.automaticTransmission = false;
    }
    CarBuilder.prototype.setBrand = function (brand) {
        this.brand = brand;
        return this;
    };
    CarBuilder.prototype.setEngine = function (engine) {
        this.engine = engine;
        return this;
    };
    CarBuilder.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    CarBuilder.prototype.addSunroof = function () {
        this.sunroof = true;
        return this;
    };
    CarBuilder.prototype.addAutomaticTransmission = function () {
        this.automaticTransmission = true;
        return this;
    };
    CarBuilder.prototype.getBrand = function () {
        return this.brand;
    };
    CarBuilder.prototype.getEngine = function () {
        return this.engine;
    };
    CarBuilder.prototype.getColor = function () {
        return this.color;
    };
    CarBuilder.prototype.hasSunroof = function () {
        return this.sunroof;
    };
    CarBuilder.prototype.hasAutomaticTransmission = function () {
        return this.automaticTransmission;
    };
    CarBuilder.prototype.build = function () {
        return new Car(this);
    };
    return CarBuilder;
}());
function main() {
    var tesla = new CarBuilder()
        .setBrand("Tesla Model S")
        .setEngine("Electric")
        .setColor("Black")
        .addSunroof()
        .addAutomaticTransmission()
        .build();
    console.log(tesla.getDetails());
}
main();
