var Pizza = /** @class */ (function () {
    function Pizza(builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
    }
    Pizza.prototype.getDetails = function () {
        var ingredients = [];
        if (this.cheese)
            ingredients.push('cheese');
        if (this.pepperoni)
            ingredients.push('pepperoni');
        if (this.mushrooms)
            ingredients.push('mushrooms');
        return "Pizza (size: ".concat(this.size, ") with ").concat(ingredients.length ? ingredients.join(', ') : 'no extra toppings', ".");
    };
    return Pizza;
}());
var PizzaBuilder = /** @class */ (function () {
    function PizzaBuilder() {
        this.size = 'medium';
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
    }
    PizzaBuilder.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    PizzaBuilder.prototype.addCheese = function () {
        this.cheese = true;
        return this;
    };
    PizzaBuilder.prototype.addPepperoni = function () {
        this.pepperoni = true;
        return this;
    };
    PizzaBuilder.prototype.addMushrooms = function () {
        this.mushrooms = true;
        return this;
    };
    PizzaBuilder.prototype.build = function () {
        return new Pizza(this);
    };
    return PizzaBuilder;
}());
function main() {
    var pizza = new PizzaBuilder()
        .setSize('large')
        .addCheese()
        .addMushrooms()
        .build();
    console.log(pizza.getDetails());
}
main();
