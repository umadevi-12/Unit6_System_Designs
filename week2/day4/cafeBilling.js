var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Beverage = /** @class */ (function () {
    function Beverage() {
    }
    return Beverage;
}());
var Espresso = /** @class */ (function (_super) {
    __extends(Espresso, _super);
    function Espresso() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Espresso.prototype.getDescription = function () {
        return "Espresso";
    };
    Espresso.prototype.getCost = function () {
        return 80;
    };
    return Espresso;
}(Beverage));
var LemonTea = /** @class */ (function (_super) {
    __extends(LemonTea, _super);
    function LemonTea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LemonTea.prototype.getDescription = function () {
        return "LemonTea";
    };
    LemonTea.prototype.getCost = function () {
        return 40;
    };
    return LemonTea;
}(Beverage));
var BeverageDecorator = /** @class */ (function (_super) {
    __extends(BeverageDecorator, _super);
    function BeverageDecorator(beverage) {
        var _this = _super.call(this) || this;
        _this.beverage = beverage;
        return _this;
    }
    return BeverageDecorator;
}(Beverage));
var Sugar = /** @class */ (function (_super) {
    __extends(Sugar, _super);
    function Sugar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sugar.prototype.getDescription = function () {
        return this.beverage.getDescription() + " + Sugar";
    };
    Sugar.prototype.getCost = function () {
        return this.beverage.getCost() + 10;
    };
    return Sugar;
}(BeverageDecorator));
var Honey = /** @class */ (function (_super) {
    __extends(Honey, _super);
    function Honey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Honey.prototype.getDescription = function () {
        return this.beverage.getDescription() + " + Honey";
    };
    Honey.prototype.getCost = function () {
        return this.beverage.getCost() + 20;
    };
    return Honey;
}(BeverageDecorator));
var WhippedCream = /** @class */ (function (_super) {
    __extends(WhippedCream, _super);
    function WhippedCream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhippedCream.prototype.getDescription = function () {
        return this.beverage.getDescription() + " + WhippedCream";
    };
    WhippedCream.prototype.getCost = function () {
        return this.beverage.getCost() + 15;
    };
    return WhippedCream;
}(BeverageDecorator));
var order1 = new Honey(new WhippedCream(new Espresso()));
var order2 = new Sugar(new Sugar(new LemonTea()));
console.log("Order 1:", order1.getDescription());
console.log("Cost 1: ₹", order1.getCost());
console.log("Order 2:", order2.getDescription());
console.log("Cost 2: ₹", order2.getCost());
