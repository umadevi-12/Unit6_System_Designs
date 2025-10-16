var Pizza = /** @class */ (function () {
    function Pizza(builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
    }
    Pizza.prototype.getDescription = function () {
        return "Pizza Details:\n    Size: ".concat(this.size, "\n    Cheese: ").concat(this.cheese ? "Yes" : "No", "\n    Pepperoni: ").concat(this.pepperoni ? "Yes" : "No", "\n    Mushrooms: ").concat(this.mushrooms ? "Yes" : "No");
    };
    return Pizza;
}());
// The Builder class
var PizzaBuilder = /** @class */ (function () {
    function PizzaBuilder(size) {
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
        this.size = size;
    }
    PizzaBuilder.prototype.addCheese = function () {
        this.cheese = true;
        return this;
    };
    PizzaBuilder.prototype.addPepperoni = function () {
        this.pepperoni = true;
        return this;
    };
    PizzaBuilder.prototype.addMushrooms = function () {
        this.mushrooms = true;
        return this;
    };
    PizzaBuilder.prototype.build = function () {
        return new Pizza(this);
    };
    return PizzaBuilder;
}());
function main() {
    var pizza = new PizzaBuilder("Large")
        .addCheese()
        .addMushrooms()
        .build();
    console.log(pizza.getDescription());
}
main();
