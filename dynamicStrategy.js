var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting");
    };
    return Bike;
}());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        console.log("Car is starting");
    };
    return Car;
}());
var Driver = /** @class */ (function () {
    function Driver(vehicle) {
        this.vehicle = vehicle;
    }
    Driver.prototype.drive = function () {
        this.vehicle.start();
        console.log("Driving...");
    };
    Driver.prototype.setVehicle = function (vehicle) {
        this.vehicle = vehicle;
    };
    return Driver;
}());
var bike = new Bike();
var car = new Car();
var driver = new Driver(bike);
driver.drive();
driver.setVehicle(car);
driver.drive();
