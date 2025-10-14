class Vehicle {
  constructor(name) {
    this.name = name;
  }

  getDetails() {
    throw new Error("getDetails() must be implemented by subclass");
  }
}

class Bike extends Vehicle {
  constructor(name) {
    super(name);
  }

  getDetails() {
    return `Bike: ${this.name}`;
  }
}


class Car extends Vehicle {
  constructor(name) {
    super(name);
  }

  getDetails() {
    return `Car: ${this.name}`;
  }
}

class VehicleFactory {
  static createVehicle(type, name) {
    if (type === "Bike") {
      return new Bike(name);
    } else if (type === "Car") {
      return new Car(name);
    } else {
      throw new Error("Invalid vehicle type");
    }
  }
}


const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails()); 

const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); 
