class Bird {
constructor(name) {
this.name = name;
}
eat() {
console.log(`${this.name} is eating.`);
}
}

class FlyableBird extends Bird {
fly() {
console.log(`${this.name} is flying.`);
}
}


class Sparrow extends FlyableBird {}

class Ostrich extends Bird {}

const sparrow = new Sparrow("Sparrow");
sparrow.eat(); 
sparrow.fly(); 


const ostrich = new Ostrich("Ostrich");
ostrich.eat();