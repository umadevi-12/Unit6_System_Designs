// tightCouplingExample.ts

class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    engine: Engine;

    constructor() {
        // Car is directly creating and using Engine → tight coupling
        this.engine = new Engine();
    }

    drive() {
        this.engine.start();  // Directly depends on Engine
        console.log("Car is driving");
    }
}

// Demo
const myCar = new Car();
myCar.drive();
