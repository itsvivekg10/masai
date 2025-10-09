interface ShippingStrategy {
  calculate(): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}

class ShippingCalculator {
  constructor(private strategy: ShippingStrategy) {}

  calculate(): number {
    return this.strategy.calculate();
  }
}

const standard = new ShippingCalculator(new StandardShipping());
console.log(standard.calculate()); // 50

const express = new ShippingCalculator(new ExpressShipping());
console.log(express.calculate()); // 100
