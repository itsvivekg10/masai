// Step 1: Create abstract class Beverage
abstract class Beverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Step 2: GreenTea class extends Beverage
class GreenTea extends Beverage {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

// Step 3: Test
const tea = new GreenTea();
console.log(tea.getDescription()); // Green Tea
console.log(tea.getCost());        // 40
