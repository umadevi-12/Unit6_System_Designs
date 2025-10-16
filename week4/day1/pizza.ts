class Pizza {
  size: string;
  cheese: boolean;
  pepperoni: boolean;
  mushrooms: boolean;

  constructor(builder: PizzaBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
  }

  public getDescription(): string {
    return `Pizza Details:
    Size: ${this.size}
    Cheese: ${this.cheese ? "Yes" : "No"}
    Pepperoni: ${this.pepperoni ? "Yes" : "No"}
    Mushrooms: ${this.mushrooms ? "Yes" : "No"}`;
  }
}

// The Builder class
class PizzaBuilder {
  size: string;
  cheese: boolean = false;
  pepperoni: boolean = false;
  mushrooms: boolean = false;

  constructor(size: string) {
    this.size = size;
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

function main() {
  const pizza = new PizzaBuilder("Large")
    .addCheese()
    .addMushrooms()
    .build();

  console.log(pizza.getDescription());
}


main();
