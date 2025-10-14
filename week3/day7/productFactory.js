
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getDescription() {
    throw new Error("getDescription() must be implemented by subclass");
  }
}

class Laptop extends Product {
  constructor(name, price) {
    super(name, price);
  }

  getDescription() {
    return `Laptop: ${this.name}, Price: $${this.price}`;
  }
}
class Mobile extends Product {
  constructor(name, price) {
    super(name, price);
  }

  getDescription() {
    return `Mobile: ${this.name}, Price: $${this.price}`;
  }
}


class Tablet extends Product {
  constructor(name, price) {
    super(name, price);
  }

  getDescription() {
    return `Tablet: ${this.name}, Price: $${this.price}`;
  }
}

const productMap = {
  Laptop: Laptop,
  Mobile: Mobile,
  Tablet: Tablet,
  
};


class ProductFactory {
  static createProduct(type, name, price) {
    const ProductClass = productMap[type];
    if (!ProductClass) throw new Error("Unknown product type");
    return new ProductClass(name, price);
  }
}

const laptop = ProductFactory.createProduct("Laptop", "MacBook Pro", 2500);
console.log(laptop.getDescription()); 


const mobile = ProductFactory.createProduct("Mobile", "iPhone 14", 1200);
console.log(mobile.getDescription()); 


const tablet = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(tablet.getDescription()); 
