
class State {
  insertCard(atm) {
    console.log("Action not allowed in current state.");
  }
  enterPin(atm, pin) {
    console.log("Action not allowed in current state.");
  }
  withdrawCash(atm, amount) {
    console.log("Action not allowed in current state.");
  }
  dispenseCash(atm) {
    console.log("Action not allowed in current state.");
  }
}


class IdleState extends State {
  insertCard(atm) {
    console.log("Card inserted. Please enter your PIN.");
    atm.setState(atm.cardInsertedState);
  }
}

class CardInsertedState extends State {
  enterPin(atm, pin) {
    if (pin === atm.correctPin) {
      console.log("PIN verified successfully.");
      atm.setState(atm.authenticatedState);
    } else {
      console.log("Incorrect PIN. Card ejected.");
      atm.setState(atm.idleState);
    }
  }
}


class AuthenticatedState extends State {
  withdrawCash(atm, amount) {
    if (amount <= atm.balance) {
      console.log(`Withdrawing ₹${amount}...`);
      atm.balance -= amount;
      atm.setState(atm.dispensingCashState);
      atm.dispenseCash();
    } else {
      console.log("Insufficient balance.");
    }
  }
}


class DispensingCashState extends State {
  dispenseCash(atm) {
    console.log("Dispensing cash... Please take your money.");
    console.log("Transaction complete. Returning to idle state.");
    atm.setState(atm.idleState); 
  }
}

class ATM {
  constructor(balance = 1000, correctPin = 1234) {
    this.idleState = new IdleState();
    this.cardInsertedState = new CardInsertedState();
    this.authenticatedState = new AuthenticatedState();
    this.dispensingCashState = new DispensingCashState();

    this.state = this.idleState;
    this.balance = balance;
    this.correctPin = correctPin;
  }

  setState(state) {
    this.state = state;
  }

  insertCard() {
    this.state.insertCard(this);
  }

  enterPin(pin) {
    this.state.enterPin(this, pin);
  }

  withdrawCash(amount) {
    this.state.withdrawCash(this, amount);
  }

  dispenseCash() {
    this.state.dispenseCash(this);
  }
}

const atm = new ATM(2000, 1234);

atm.insertCard();     
atm.enterPin(1234);   
atm.withdrawCash(500); 
atm.insertCard();     
atm.enterPin(1111);   
