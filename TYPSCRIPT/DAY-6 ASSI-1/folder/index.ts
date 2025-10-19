
class Pizza {
  size: 'small' | 'medium' | 'large';
  cheese: boolean;
  pepperoni: boolean;
  mushrooms: boolean;

  constructor(builder: PizzaBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
  }

  getDetails(): string {
    const ingredients: string[] = [];
    if (this.cheese) ingredients.push('cheese');
    if (this.pepperoni) ingredients.push('pepperoni');
    if (this.mushrooms) ingredients.push('mushrooms');

    return `Pizza (size: ${this.size}) with ${ingredients.length ? ingredients.join(', ') : 'no extra toppings'}.`;
  }
}

class PizzaBuilder {
  size: 'small' | 'medium' | 'large' = 'medium';
  cheese: boolean = false;
  pepperoni: boolean = false;
  mushrooms: boolean = false;

  setSize(size: 'small' | 'medium' | 'large'): PizzaBuilder {
    this.size = size;
    return this;
  }

  addCheese(): PizzaBuilder {
    this.cheese = true;
    return this;
  }

  addPepperoni(): PizzaBuilder {
    this.pepperoni = true;
    return this;
  }

  addMushrooms(): PizzaBuilder {
    this.mushrooms = true;
    return this;
  }

  build(): Pizza {
    return new Pizza(this);
  }
}

function main(): void {
  const pizza = new PizzaBuilder()
    .setSize('large')
    .addCheese()
    .addMushrooms()
    .build();

  console.log(pizza.getDetails());
}

main();
