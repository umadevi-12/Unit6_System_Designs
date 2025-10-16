class Car {
  brand: string;
  engine: string;
  color: string;
  sunroof: boolean;
  automaticTransmission: boolean;

  constructor(builder: CarBuilder) {
    this.brand = builder.brand;
    this.engine = builder.engine;
    this.color = builder.color;
    this.sunroof = builder.sunroof;
    this.automaticTransmission = builder.automaticTransmission;
  }

  public getDetails(): string {
    return `Car Details:
    Brand: ${this.brand}
    Engine: ${this.engine}
    Color: ${this.color}
    Sunroof: ${this.sunroof ? "Yes" : "No"}
    Automatic Transmission: ${this.automaticTransmission ? "Yes" : "No"}`;
  }
}

class CarBuilder {
  brand: string;
  engine: string = "Standard";
  color: string = "White";
  sunroof: boolean = false;
  automaticTransmission: boolean = false;

  constructor(brand: string) {
    this.brand = brand;
  }

  setEngine(engine: string): CarBuilder {
    this.engine = engine;
    return this;
  }

  setColor(color: string): CarBuilder {
    this.color = color;
    return this;
  }

  addSunroof(): CarBuilder {
    this.sunroof = true;
    return this;
  }

  setAutomaticTransmission(): CarBuilder {
    this.automaticTransmission = true;
    return this;
  }

  build(): Car {
    return new Car(this);
  }
}


function main() {
  const tesla = new CarBuilder("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .setAutomaticTransmission()
    .build();

  console.log(tesla.getDetails());
}

main();
