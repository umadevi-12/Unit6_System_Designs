abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}
class GreenTea extends Beverage {
    getDescription(): string {
        return "Green Tea";
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

const teaWithDoubleSugar = new Sugar(new Sugar(new GreenTea()));
console.log(teaWithDoubleSugar.getDescription()); 
console.log(teaWithDoubleSugar.getCost());        
