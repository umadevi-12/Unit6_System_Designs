class Duck {
    swim() {
        console.log("I know swimming");
    }
}


class PolyDuck {
    fly() {
        console.log("Flying...");
    }
}

class DesiDuck extends PolyDuck {
    fly() {
        console.log("DesiDuck flies at 10kmph");
    }
}

class VidesiDuck extends PolyDuck {
    fly() {
        console.log("VidesiDuck flies at 20kmph");
    }
}

class SmartDuck extends PolyDuck {
    fly() {
        console.log("SmartDuck flies at 50kmph");
    }
}

function makeDuckFly(duck) {
    duck.fly();
}

makeDuckFly(new DesiDuck());
makeDuckFly(new VidesiDuck());
makeDuckFly(new SmartDuck());

console.log('------------------');


class User {
    name;              
    #orgCode = "DuckCorp"; 
    _role;             
    constructor(name, role) {
        this.name = name;
        this._role = role;
    }

    introduce() {
        console.log(`I am ${this.name} from ${this.#orgCode}`);
    }
}

class Manager extends User {
    getRole() {
        console.log(this._role);
    }
}

const user = new User("Daffy", "Employee");
user.introduce();

const manager = new Manager("Donald", "Manager");
manager.getRole(); 


