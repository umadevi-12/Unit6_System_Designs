
class ShippingStrategy {
    calculate() {
        throw new Error("calculate() must be implemented");
    }
}

class StandardShipping extends ShippingStrategy {
    calculate() {
        return 50;
    }
}

class ExpressShipping extends ShippingStrategy {
    calculate() {
        return 100;
    }
}

class Shipping {
    constructor(strategy) {
        this.strategy = strategy;
    }

    calculate() {
        return this.strategy.calculate();
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }
}


const standardShipping = new Shipping(new StandardShipping());
console.log(standardShipping.calculate()); // 50

const expressShipping = new Shipping(new ExpressShipping());
console.log(expressShipping.calculate()); // 100

class PremiumShipping extends ShippingStrategy {
    calculate() {
        return 200;
    }
}

const premiumShipping = new Shipping(new PremiumShipping());
console.log(premiumShipping.calculate()); 
