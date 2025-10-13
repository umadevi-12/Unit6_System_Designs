var PetrolEngine = /** @class */ (function () {
    function PetrolEngine() {
    }
    PetrolEngine.prototype.start = function () {
        console.log("Petrol engine started");
    };
    return PetrolEngine;
}());
var CarTight = /** @class */ (function () {
    function CarTight() {
        this.engine = new PetrolEngine();
    }
    CarTight.prototype.drive = function () {
        this.engine.start();
        console.log("Driving car");
    };
    return CarTight;
}());
console.log("=== Tight Coupling ===");
var petrolCar = new CarTight();
petrolCar.drive();
var PetrolEngineLC = /** @class */ (function () {
    function PetrolEngineLC() {
    }
    PetrolEngineLC.prototype.start = function () {
        console.log("Petrol engine started");
    };
    return PetrolEngineLC;
}());
var DieselEngine = /** @class */ (function () {
    function DieselEngine() {
    }
    DieselEngine.prototype.start = function () {
        console.log("Diesel engine started");
    };
    return DieselEngine;
}());
var CarLoose = /** @class */ (function () {
    function CarLoose(engine) {
        this.engine = engine;
    }
    CarLoose.prototype.drive = function () {
        this.engine.start();
        console.log("Driving car");
    };
    return CarLoose;
}());
console.log("\n=== Loose Coupling ===");
var petrolCarLC = new CarLoose(new PetrolEngineLC());
petrolCarLC.drive();
var dieselCarLC = new CarLoose(new DieselEngine());
dieselCarLC.drive();
