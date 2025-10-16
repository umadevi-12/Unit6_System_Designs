
interface Device {
  specifications(): void;
}

class AppleLaptop implements Device {
  specifications(): void {
    console.log("Apple Laptop: MacBook Pro, M1 Chip, 16GB RAM, 512GB SSD");
  }
}

class ApplePhone implements Device {
  specifications(): void {
    console.log("Apple Phone: iPhone 15, A17 Chip, 256GB Storage");
  }
}

class SamsungLaptop implements Device {
  specifications(): void {
    console.log("Samsung Laptop: Galaxy Book, Intel i7, 16GB RAM, 1TB SSD");
  }
}

class SamsungPhone implements Device {
  specifications(): void {
    console.log("Samsung Phone: Galaxy S23, Snapdragon 8 Gen2, 512GB Storage");
  }
}

interface DeviceFactory {
  createDevice(type: string): Device | null;
}

class AppleFactory implements DeviceFactory {
  createDevice(type: string): Device | null {
    if (type.toLowerCase() === "laptop") return new AppleLaptop();
    if (type.toLowerCase() === "phone") return new ApplePhone();
    return null;
  }
}

class SamsungFactory implements DeviceFactory {
  createDevice(type: string): Device | null {
    if (type.toLowerCase() === "laptop") return new SamsungLaptop();
    if (type.toLowerCase() === "phone") return new SamsungPhone();
    return null;
  }
}

function main() {
  const appleFactory: DeviceFactory = new AppleFactory();
  const samsungFactory: DeviceFactory = new SamsungFactory();

  const appleLaptop = appleFactory.createDevice("laptop");
  const samsungPhone = samsungFactory.createDevice("phone");

  console.log("Apple Laptop Specifications:");
  appleLaptop?.specifications();

  console.log("\nSamsung Phone Specifications:");
  samsungPhone?.specifications();
}

main();
