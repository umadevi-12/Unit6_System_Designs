
class Duck {
    swim() {
        console.log("I know swimming");
    }
}

class MallardDuck extends Duck {}

const mallard = new MallardDuck();
mallard.swim(); 

console.log('------------------');


class Bird {
    fly() {
        console.log("I can fly");
    }
}

class Penguin extends Bird {
    fly() {
        console.log("I cannot fly");
    }
}

const bird = new Bird();
const penguin = new Penguin();

bird.fly();     
penguin.fly();  

console.log('------------------');

class ToyDuck {
    fly() {
        console.log("Cannot fly");
    }

    sound() {
        console.log("Cannot sound");
    }

    swim() {
        console.log("Can float on water");
    }
}

const toy = new ToyDuck();
toy.fly();  
toy.sound(); 
toy.swim();  
