const { EventEmitter } = require('events');

const STATES = {
  IDLE: 'IDLE',
  MOVING: 'MOVING',
  OPEN_DOOR: 'OPEN_DOOR',
  CLOSE_DOOR: 'CLOSE_DOOR',
};

const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  NONE: 'NONE',
};

class PassengerRequest {
  constructor(fromFloor, toFloor, numPeople = 1, totalWeightKg = 70) {
    this.fromFloor = fromFloor;
    this.toFloor = toFloor;
    this.numPeople = numPeople;
    this.totalWeightKg = totalWeightKg;
    this.requestTime = new Date();
  }

  direction() {
    if (this.toFloor > this.fromFloor) return DIRECTIONS.UP;
    if (this.toFloor < this.fromFloor) return DIRECTIONS.DOWN;
    return DIRECTIONS.NONE;
  }
}

class Elevator extends EventEmitter {
  constructor(id, maxPeople = 8, maxWeightKg = 680, startFloor = 1) {
    super();
    this.id = id;
    this.currentFloor = startFloor;
    this.state = STATES.IDLE;
    this.direction = DIRECTIONS.NONE;
    this.destinations = new Set();
    this.maxPeople = maxPeople;
    this.maxWeightKg = maxWeightKg;
    this.occupiedPeople = 0;
    this.occupiedWeightKg = 0;
    this.ticksSinceDoorOpen = 0;
    this.openDoorDelayTicks = 2; 
  }

  status() {
    return {
      id: this.id,
      floor: this.currentFloor,
      state: this.state,
      direction: this.direction,
      occupiedPeople: this.occupiedPeople,
      occupiedWeightKg: this.occupiedWeightKg,
      destinations: Array.from(this.destinations).sort((a,b)=>a-b),
    };
  }

  canTake(request) {
    if (this.occupiedPeople + request.numPeople > this.maxPeople) return false;
    if (this.occupiedWeightKg + request.totalWeightKg > this.maxWeightKg) return false;
    return true;
  }

  addDestination(floor) {
    this.destinations.add(floor);
    this._updateDirectionBasedOnDest();
  }

  removeDestination(floor) {
    this.destinations.delete(floor);
    if (this.destinations.size === 0) {
      this.direction = DIRECTIONS.NONE;
      this.state = STATES.IDLE;
    } else {
      this._updateDirectionBasedOnDest();
    }
  }

  _updateDirectionBasedOnDest() {
    if (this.destinations.size === 0) {
      this.direction = DIRECTIONS.NONE;
      return;
    }
    const dests = Array.from(this.destinations);
    const upDests = dests.filter(f => f > this.currentFloor);
    const downDests = dests.filter(f => f < this.currentFloor);
    if (this.direction === DIRECTIONS.UP) {
      if (upDests.length > 0) this.direction = DIRECTIONS.UP;
      else if (downDests.length > 0) this.direction = DIRECTIONS.DOWN;
    } else if (this.direction === DIRECTIONS.DOWN) {
      if (downDests.length > 0) this.direction = DIRECTIONS.DOWN;
      else if (upDests.length > 0) this.direction = DIRECTIONS.UP;
    } else {
      const nearest = dests.reduce((acc, f) => {
        const dist = Math.abs(f - this.currentFloor);
        if (dist < acc.dist) return { floor: f, dist };
        return acc;
      }, { floor: null, dist: Infinity });
      if (nearest.floor > this.currentFloor) this.direction = DIRECTIONS.UP;
      else if (nearest.floor < this.currentFloor) this.direction = DIRECTIONS.DOWN;
      else this.direction = DIRECTIONS.NONE;
    }
  }

  stepTick() {
    if (this.state === STATES.IDLE) {
      if (this.destinations.size > 0) {
        this.state = STATES.MOVING;
        this._updateDirectionBasedOnDest();
      } else {
     
      }
    }

    if (this.state === STATES.MOVING) {
      if (this.direction === DIRECTIONS.UP) this.currentFloor += 1;
      else if (this.direction === DIRECTIONS.DOWN) this.currentFloor -= 1;
      if (this.destinations.has(this.currentFloor)) {
        this.state = STATES.OPEN_DOOR;
        this.ticksSinceDoorOpen = 0;
        this.emit('arrived', this, this.currentFloor);
      }
    } else if (this.state === STATES.OPEN_DOOR) {
      this.ticksSinceDoorOpen += 1;
      if (this.ticksSinceDoorOpen >= this.openDoorDelayTicks) {

        this.state = STATES.CLOSE_DOOR;
        this.emit('doorClosing', this, this.currentFloor);
      }
    } else if (this.state === STATES.CLOSE_DOOR) {

      if (this.destinations.has(this.currentFloor)) {
        this.removeDestination(this.currentFloor);
      }
      if (this.destinations.size > 0) {
        this.state = STATES.MOVING;
        this._updateDirectionBasedOnDest();
      } else {
        this.state = STATES.IDLE;
        this.direction = DIRECTIONS.NONE;
        this.emit('idle', this);
      }
    }
  }
  boardPassengers(numPeople, totalWeightKg) {
    const canBoardPeople = Math.max(0, this.maxPeople - this.occupiedPeople);
    const canBoardWeightPeople = Math.max(0, Math.floor((this.maxWeightKg - this.occupiedWeightKg) / (totalWeightKg / numPeople || 1)));
    const canBoard = Math.min(canBoardPeople, canBoardWeightPeople, numPeople);
    if (canBoard <= 0) return 0;

    const ratio = canBoard / numPeople;
    const weightBoarded = totalWeightKg * ratio;
    this.occupiedPeople += canBoard;
    this.occupiedWeightKg += weightBoarded;
    return canBoard;
  }

  unboardPassengersForFloor(floor) {

    const peopleLeaving = Math.floor(this.occupiedPeople / 2);
    const weightLeaving = this.occupiedWeightKg * (peopleLeaving / (this.occupiedPeople || 1));
    this.occupiedPeople -= peopleLeaving;
    this.occupiedWeightKg -= weightLeaving;
    if (this.occupiedPeople < 0) this.occupiedPeople = 0;
    if (this.occupiedWeightKg < 0) this.occupiedWeightKg = 0;
    return { peopleLeaving, weightLeaving };
  }
}

class ElevatorSystem {
  constructor(numFloors = 10, numElevators = 3, tickMs = 1000) {
    this.numFloors = numFloors;
    this.tickMs = tickMs;
    this.elevators = [];
    for (let i = 1; i <= numElevators; i++) {
      const el = new Elevator(i, 8, 680, 1);
      el.on('arrived', (e, floor) => this._onElevatorArrived(e, floor));
      el.on('doorClosing', (e, floor) => this._onDoorClosing(e, floor));
      el.on('idle', (e) => this._onElevatorIdle(e));
      this.elevators.push(el);
    }
    this.requestQueue = []; 
    this.activeRequests = []; 
    this.tickHandle = null;
  }

  logStatus() {
    console.log('--- System Status ---');
    for (const e of this.elevators) {
      const s = e.status();
      console.log(`E${s.id}: floor=${s.floor} state=${s.state} dir=${s.direction} ppl=${s.occupiedPeople}/${e.maxPeople} wt=${Math.round(s.occupiedWeightKg)}/${e.maxWeightKg} dests=[${s.destinations}]`);
    }
    console.log(`Pending requests: ${this.requestQueue.length}\n`);
  }

  startSimulation() {
    if (this.tickHandle) return;
    this.tickHandle = setInterval(() => this._tick(), this.tickMs);
  }

  stopSimulation() {
    if (!this.tickHandle) return;
    clearInterval(this.tickHandle);
    this.tickHandle = null;
  }

  requestElevator(fromFloor, toFloor, numPeople = 1, totalWeightKg = 70) {
    const req = new PassengerRequest(fromFloor, toFloor, numPeople, totalWeightKg);
    console.log(`New Request: from ${fromFloor} -> ${toFloor} people=${numPeople} wt=${totalWeightKg}kg dir=${req.direction()}`);
    const assigned = this._assignToBestElevator(req);
    if (!assigned) {
      console.log('No suitable elevator now — queuing request.');
      this.requestQueue.push(req);
    } else {
      console.log(`Assigned to Elevator ${assigned.id}`);
    }
  }

  _assignToBestElevator(req) {
   
    let best = null;
    let bestScore = Infinity;

    for (const el of this.elevators) {
     
      if (!el.canTake(req)) continue;

      const dist = Math.abs(el.currentFloor - req.fromFloor);
      let score = dist;

      if (el.state === STATES.MOVING && el.direction === req.direction()) {
      
        if ((el.direction === DIRECTIONS.UP && el.currentFloor <= req.fromFloor) ||
            (el.direction === DIRECTIONS.DOWN && el.currentFloor >= req.fromFloor)) {
          score -= 2;
        }
      } else if (el.state === STATES.IDLE) {
        score -= 1;
      }

      score += (el.occupiedPeople / el.maxPeople);

      if (score < bestScore) {
        bestScore = score;
        best = el;
      }
    }

    if (!best) return null;

    best.addDestination(req.fromFloor);

    this.activeRequests.push({ req, elevatorId: best.id, picked: false });
    return best;
  }

  _onElevatorArrived(elevator, floor) {
    console.log(`Elevator ${elevator.id} arrived at floor ${floor} (state=${elevator.state})`);

    const assignedRequests = this.activeRequests.filter(ar => ar.elevatorId === elevator.id && !ar.picked && ar.req.fromFloor === floor);

    for (const ar of assignedRequests) {
      const r = ar.req;

      const canBoardCnt = elevator.boardPassengers(r.numPeople, r.totalWeightKg);
      if (canBoardCnt > 0) {
        ar.picked = true;

        elevator.addDestination(r.toFloor);
        console.log(`  -> ${canBoardCnt}/${r.numPeople} boarded in E${elevator.id} to go ${r.toFloor}`);
      }
      if (canBoardCnt < r.numPeople) {

        const remainingPeople = r.numPeople - canBoardCnt;
        const remainingWeight = r.totalWeightKg * (remainingPeople / r.numPeople);
        const residual = new PassengerRequest(floor, r.toFloor, remainingPeople, remainingWeight);
        console.log(`  -> ${remainingPeople} could not board; queued as residual request at floor ${floor}`);
        this.requestQueue.push(residual);
      }
    }
    if (elevator.destinations.has(floor)) {
      const unboard = elevator.unboardPassengersForFloor(floor);
      if (unboard.peopleLeaving > 0) {
        console.log(`  -> ${unboard.peopleLeaving} passengers left E${elevator.id} at floor ${floor} (freed ${Math.round(unboard.weightLeaving)}kg)`);
      }
    }

  }

  _onDoorClosing(elevator, floor) {
    console.log(`Elevator ${elevator.id} doors closing at floor ${floor}`);
    this.activeRequests = this.activeRequests.filter(ar => !(ar.elevatorId === elevator.id && ar.req.fromFloor === floor && ar.picked === true));
  }

  _onElevatorIdle(elevator) {
    console.log(`Elevator ${elevator.id} is now idle at floor ${elevator.currentFloor}`);

    this._drainQueue();
  }

  _drainQueue() {
    const queue = this.requestQueue.slice();
    this.requestQueue = [];
    for (const req of queue) {
      const assigned = this._assignToBestElevator(req);
      if (!assigned) {

        this.requestQueue.push(req);
      } else {
        console.log(`Queued request from ${req.fromFloor} assigned to E${assigned.id}`);
      }
    }
  }

  _tick() {

    for (const el of this.elevators) {
      el.stepTick();
    }

    if (this.requestQueue.length > 0) this._drainQueue();

  }
}
function demo() {
  const system = new ElevatorSystem(12, 3, 700); 
  system.startSimulation();
  system.requestElevator(1, 8, 2, 140);
  system.requestElevator(3, 10, 1, 70);
  system.requestElevator(7, 2, 3, 210);
  system.requestElevator(12, 1, 2, 160);

  setTimeout(() => system.requestElevator(1, 5, 1, 70), 2500);


  setTimeout(() => system.requestElevator(4, 9, 6, 480), 3500);

 
  setInterval(() => system.logStatus(), 4000);

  setTimeout(() => {
    system.stopSimulation();
    console.log('Simulation stopped.');
  }, 35000);
}

demo();
