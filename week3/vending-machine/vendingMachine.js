
class State {
  insertCoin(machine) {
    console.log("Action not allowed in current state");
  }
  selectProduct(machine) {
    console.log("Action not allowed in current state");
  }
  dispense(machine) {
    console.log("Action not allowed in current state");
  }
}
class IdleState extends State {
  insertCoin(machine) {
    console.log("Coin inserted. Moving to Processing state.");
    machine.setState(machine.processingState);
  }
}


class ProcessingState extends State {
  selectProduct(machine) {
    console.log("Product selected. Moving to Dispensing state.");
    machine.setState(machine.dispensingState);
  }
}

class DispensingState extends State {
  dispense(machine) {
    console.log("Dispensing product. Returning to Idle state.");
    machine.setState(machine.idleState);
  }
}


class VendingMachine {
  constructor() {
    this.idleState = new IdleState();
    this.processingState = new ProcessingState();
    this.dispensingState = new DispensingState();

    this.state = this.idleState; 
  }

  setState(state) {
    this.state = state;
  }

  insertCoin() {
    this.state.insertCoin(this);
  }

  selectProduct() {
    this.state.selectProduct(this);
  }

  dispense() {
    this.state.dispense(this);
  }
}


const machine = new VendingMachine();

machine.insertCoin();   
machine.selectProduct();
machine.dispense();      
machine.dispense();      
machine.insertCoin();    
