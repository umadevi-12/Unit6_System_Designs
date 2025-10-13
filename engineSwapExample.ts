
class PetrolEngine {
    start(): void {
        console.log("Petrol engine started");
    }
}

class CarTight {
    engine: PetrolEngine = new PetrolEngine(); 

    drive(): void {
        this.engine.start(); 
        console.log("Driving car");
    }
}
console.log("=== Tight Coupling ===");
const petrolCar = new CarTight();
petrolCar.drive();


interface IEngine {
    start(): void;
}


class PetrolEngineLC implements IEngine {
    start(): void {
        console.log("Petrol engine started");
    }
}

class DieselEngine implements IEngine {
    start(): void {
        console.log("Diesel engine started");
    }
}

class CarLoose {
    engine: IEngine;

    constructor(engine: IEngine) {
        this.engine = engine; 
    }

    drive(): void {
        this.engine.start();
        console.log("Driving car");
    }
}

console.log("\n=== Loose Coupling ===");
const petrolCarLC = new CarLoose(new PetrolEngineLC());
petrolCarLC.drive();

const dieselCarLC = new CarLoose(new DieselEngine());
dieselCarLC.drive();
