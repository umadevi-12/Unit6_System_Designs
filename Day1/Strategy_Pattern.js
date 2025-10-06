
class FlyStrategy {
    fly() {
        throw new Error("fly() method should be implemented");
    }
}

class FastFly extends FlyStrategy {
    fly() {
        console.log("Flying fast like a rocket!");
    }
}

class NoFly extends FlyStrategy {
    fly() {
        console.log("I cannot fly");
    }
}

class Duck {
    constructor(flyStrategy) {
        this.flyStrategy = flyStrategy;
    }

    performFly() {
        this.flyStrategy.fly();
    }

    setFlyStrategy(newStrategy) {
        this.flyStrategy = newStrategy;
    }
}

const duck = new Duck(new FastFly());
duck.performFly(); 

duck.setFlyStrategy(new NoFly());
duck.performFly(); 
