class Vehicle {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }
}

const VEHICLE_TYPE = {
  CAR: 'CAR',
  EV_CAR: 'EV_CAR',
  BIKE: 'BIKE',
  TRUCK: 'TRUCK'
};

const PARKING_RATE = {
  CAR: 20,
  EV_CAR: 25,
  BIKE: 10,
  TRUCK: 30
};

class ParkingSlot {
  constructor(id, type, isReservedEV = false) {
    this.id = id;
    this.type = type;
    this.isReservedEV = isReservedEV;
    this.isOccupied = false;
    this.vehicle = null;
  }

  park(vehicle) {
    if (this.isOccupied) throw new Error('Slot already occupied');
    if (this.isReservedEV && vehicle.type !== VEHICLE_TYPE.EV_CAR)
      throw new Error('This slot is reserved for EV cars');
    this.vehicle = vehicle;
    this.isOccupied = true;
  }

  unpark() {
    if (!this.isOccupied) throw new Error('Slot is already empty');
    const v = this.vehicle;
    this.vehicle = null;
    this.isOccupied = false;
    return v;
  }
}

class ParkingFloor {
  constructor(floorNumber, slotsPerFloor) {
    this.floorNumber = floorNumber;
    this.slots = [];

    for (let i = 0; i < slotsPerFloor; i++) {
      let isReservedEV = i === 0; 
      this.slots.push(new ParkingSlot(`${floorNumber}-${i + 1}`, VEHICLE_TYPE.CAR, isReservedEV));
    }
  }

  findAvailableSlot(vehicle) {
    return this.slots.find(
      (slot) =>
        !slot.isOccupied &&
        (slot.isReservedEV ? vehicle.type === VEHICLE_TYPE.EV_CAR : true)
    );
  }
}

class Ticket {
  constructor(vehicle, slotId) {
    this.vehicle = vehicle;
    this.slotId = slotId;
    this.entryTime = new Date();
    this.exitTime = null;
  }

  closeTicket() {
    this.exitTime = new Date();
  }

  calculateCharge() {
    const hours = Math.ceil((this.exitTime - this.entryTime) / (1000 * 60 * 60));
    return hours * (PARKING_RATE[this.vehicle.type] || 20);
  }
}


class EvenDistributionStrategy {
  constructor(parkingFloors) {
    this.parkingFloors = parkingFloors;
    this.lastUsedFloor = -1;
  }

  findSlot(vehicle) {
    const start = (this.lastUsedFloor + 1) % this.parkingFloors.length;
    for (let i = 0; i < this.parkingFloors.length; i++) {
      const floor = this.parkingFloors[(start + i) % this.parkingFloors.length];
      const slot = floor.findAvailableSlot(vehicle);
      if (slot) {
        this.lastUsedFloor = floor.floorNumber - 1;
        return slot;
      }
    }
    return null;
  }
}

class ParkingLot {
  constructor(name, numFloors, slotsPerFloor, strategy = null) {
    this.name = name;
    this.parkingFloors = [];
    for (let i = 1; i <= numFloors; i++) {
      this.parkingFloors.push(new ParkingFloor(i, slotsPerFloor));
    }
    this.strategy = strategy || new EvenDistributionStrategy(this.parkingFloors);
    this.activeTickets = new Map();
  }

  parkVehicle(vehicle) {
    const slot = this.strategy.findSlot(vehicle);
    if (!slot) {
      console.log(` No available slot for ${vehicle.type}`);
      return null;
    }

    slot.park(vehicle);
    const ticket = new Ticket(vehicle, slot.id);
    this.activeTickets.set(vehicle.number, ticket);
    console.log(` ${vehicle.type} ${vehicle.number} parked at slot ${slot.id}`);
    return ticket;
  }

  unparkVehicle(vehicleNumber) {
    const ticket = this.activeTickets.get(vehicleNumber);
    if (!ticket) {
      console.log(' Ticket not found');
      return;
    }

    ticket.closeTicket();
    const [floorNum, slotNum] = ticket.slotId.split('-').map(Number);
    const floor = this.parkingFloors[floorNum - 1];
    const slot = floor.slots[slotNum - 1];
    slot.unpark();

    const charge = ticket.calculateCharge();
    console.log(
      ` Vehicle ${vehicleNumber} unparked. Duration: ${(
        (ticket.exitTime - ticket.entryTime) /
        (1000 * 60)
      ).toFixed(1)} mins. Total Charge: ₹${charge}`
    );

    this.activeTickets.delete(vehicleNumber);
    return charge;
  }

  displayStatus() {
    console.log('\n--- Parking Lot Status ---');
    this.parkingFloors.forEach((floor) => {
      const occupied = floor.slots.filter((s) => s.isOccupied).length;
      console.log(
        `Floor ${floor.floorNumber}: ${occupied}/${floor.slots.length} occupied`
      );
    });
  }
}
const parkingLot = new ParkingLot('CityCenter', 3, 5);
const car1 = new Vehicle(VEHICLE_TYPE.CAR, 'TN01A1234');
const ev1 = new Vehicle(VEHICLE_TYPE.EV_CAR, 'TN09E9999');

const t1 = parkingLot.parkVehicle(car1);
const t2 = parkingLot.parkVehicle(ev1);
parkingLot.displayStatus();

setTimeout(() => {
  parkingLot.unparkVehicle('TN09E9999');
  parkingLot.displayStatus();
}, 2000);
