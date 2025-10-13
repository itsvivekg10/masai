// Abstract Beverage class
abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}

// Concrete Beverage: GreenTea
class GreenTea extends Beverage {
    getDescription(): string {
        return "Green Tea";
    }
    getCost(): number {
        return 40;
    }
}

// Decorator: Sugar
class Sugar extends Beverage {
    private beverage: Beverage;
    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription(): string {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost(): number {
        return this.beverage.getCost() + 10;
    }
}

// Decorator: Honey
class Honey extends Beverage {
    private beverage: Beverage;
    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription(): string {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost(): number {
        return this.beverage.getCost() + 20;
    }
}

// Usage: GreenTea with Sugar and Honey
const tea = new Honey(new Sugar(new GreenTea()));
console.log(tea.getDescription()); // Green Tea + Sugar + Honey
console.log(tea.getCost());        // 70
