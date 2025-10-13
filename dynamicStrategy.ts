
interface Vehicle {
    start(): void;
}
class Bike implements Vehicle {
    start(): void {
        console.log("Bike is starting");
    }
}

class Car implements Vehicle {
    start(): void {
        console.log("Car is starting");
    }
}
class Driver {
    private vehicle: Vehicle;

    constructor(vehicle: Vehicle) {
        this.vehicle = vehicle;
    }

    drive(): void {
        this.vehicle.start();
        console.log("Driving...");
    }

    setVehicle(vehicle: Vehicle): void {
        this.vehicle = vehicle;
    }
}

const bike = new Bike();
const car = new Car();

const driver = new Driver(bike);
driver.drive(); 

driver.setVehicle(car);
driver.drive(); 
