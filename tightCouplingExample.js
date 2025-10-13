// tightCouplingExample.ts
var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.prototype.start = function () {
        console.log("Engine started");
    };
    return Engine;
}());
var Car = /** @class */ (function () {
    function Car() {
        // Car is directly creating and using Engine → tight coupling
        this.engine = new Engine();
    }
    Car.prototype.drive = function () {
        this.engine.start(); // Directly depends on Engine
        console.log("Car is driving");
    };
    return Car;
}());
// Demo
var myCar = new Car();
myCar.drive();
