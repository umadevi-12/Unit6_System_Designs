class PaymentStrategy {
    process(amount) {
        throw new Error("process() must be implemented");
    }
}

class CardPayment extends PaymentStrategy {
    process(amount) {
        console.log(`Processing card payment of $${amount}`);
    }
}

class UPIPayment extends PaymentStrategy {
    process(amount) {
        console.log(`Processing UPI payment of $${amount}`);
    }
}

class BitcoinPayment extends PaymentStrategy {
    process(amount) {
        console.log(`Processing Bitcoin payment of $${amount}`);
    }
}
class Payment {
    constructor(strategy) {
        this.strategy = strategy;
    }

    process(amount) {
        this.strategy.process(amount);
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }
}

const payment = new Payment(new CardPayment());
payment.process(1000); 

payment.setStrategy(new BitcoinPayment());
payment.process(2000); 

payment.setStrategy(new UPIPayment());
payment.process(500); 