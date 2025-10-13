
abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}

class Espresso extends Beverage {
    getDescription(): string {
        return "Espresso";
    }

    getCost(): number {
        return 80;
    }
}

class LemonTea extends Beverage {
    getDescription(): string {
        return "LemonTea";
    }

    getCost(): number {
        return 40;
    }
}

abstract class BeverageDecorator extends Beverage {
    protected beverage: Beverage;

    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }
}


class Sugar extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Sugar";
    }

    getCost(): number {
        return this.beverage.getCost() + 10;
    }
}

class Honey extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Honey";
    }

    getCost(): number {
        return this.beverage.getCost() + 20;
    }
}

class WhippedCream extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + WhippedCream";
    }

    getCost(): number {
        return this.beverage.getCost() + 15;
    }
}



const order1 = new Honey(new WhippedCream(new Espresso()));
const order2 = new Sugar(new Sugar(new LemonTea()));

console.log("Order 1:", order1.getDescription()); 
console.log("Cost 1: ₹", order1.getCost());      

console.log("Order 2:", order2.getDescription()); 
console.log("Cost 2: ₹", order2.getCost());       
