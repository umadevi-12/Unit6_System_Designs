var Car = /** @class */ (function () {
    function Car(builder) {
        this.brand = builder.brand;
        this.engine = builder.engine;
        this.color = builder.color;
        this.sunroof = builder.sunroof;
        this.automaticTransmission = builder.automaticTransmission;
    }
    Car.prototype.getDetails = function () {
        return "Car Details:\n    Brand: ".concat(this.brand, "\n    Engine: ").concat(this.engine, "\n    Color: ").concat(this.color, "\n    Sunroof: ").concat(this.sunroof ? "Yes" : "No", "\n    Automatic Transmission: ").concat(this.automaticTransmission ? "Yes" : "No");
    };
    return Car;
}());
var CarBuilder = /** @class */ (function () {
    function CarBuilder(brand) {
        this.engine = "Standard";
        this.color = "White";
        this.sunroof = false;
        this.automaticTransmission = false;
        this.brand = brand;
    }
    CarBuilder.prototype.setEngine = function (engine) {
        this.engine = engine;
        return this;
    };
    CarBuilder.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    CarBuilder.prototype.addSunroof = function () {
        this.sunroof = true;
        return this;
    };
    CarBuilder.prototype.setAutomaticTransmission = function () {
        this.automaticTransmission = true;
        return this;
    };
    CarBuilder.prototype.build = function () {
        return new Car(this);
    };
    return CarBuilder;
}());
function main() {
    var tesla = new CarBuilder("Tesla Model S")
        .setEngine("Electric")
        .setColor("Black")
        .addSunroof()
        .setAutomaticTransmission()
        .build();
    console.log(tesla.getDetails());
}
main();
