var AppleLaptop = /** @class */ (function () {
    function AppleLaptop() {
    }
    AppleLaptop.prototype.specifications = function () {
        console.log("Apple Laptop: MacBook Pro, M1 Chip, 16GB RAM, 512GB SSD");
    };
    return AppleLaptop;
}());
var ApplePhone = /** @class */ (function () {
    function ApplePhone() {
    }
    ApplePhone.prototype.specifications = function () {
        console.log("Apple Phone: iPhone 15, A17 Chip, 256GB Storage");
    };
    return ApplePhone;
}());
var SamsungLaptop = /** @class */ (function () {
    function SamsungLaptop() {
    }
    SamsungLaptop.prototype.specifications = function () {
        console.log("Samsung Laptop: Galaxy Book, Intel i7, 16GB RAM, 1TB SSD");
    };
    return SamsungLaptop;
}());
var SamsungPhone = /** @class */ (function () {
    function SamsungPhone() {
    }
    SamsungPhone.prototype.specifications = function () {
        console.log("Samsung Phone: Galaxy S23, Snapdragon 8 Gen2, 512GB Storage");
    };
    return SamsungPhone;
}());
var AppleFactory = /** @class */ (function () {
    function AppleFactory() {
    }
    AppleFactory.prototype.createDevice = function (type) {
        if (type.toLowerCase() === "laptop")
            return new AppleLaptop();
        if (type.toLowerCase() === "phone")
            return new ApplePhone();
        return null;
    };
    return AppleFactory;
}());
var SamsungFactory = /** @class */ (function () {
    function SamsungFactory() {
    }
    SamsungFactory.prototype.createDevice = function (type) {
        if (type.toLowerCase() === "laptop")
            return new SamsungLaptop();
        if (type.toLowerCase() === "phone")
            return new SamsungPhone();
        return null;
    };
    return SamsungFactory;
}());
function main() {
    var appleFactory = new AppleFactory();
    var samsungFactory = new SamsungFactory();
    var appleLaptop = appleFactory.createDevice("laptop");
    var samsungPhone = samsungFactory.createDevice("phone");
    console.log("Apple Laptop Specifications:");
    appleLaptop === null || appleLaptop === void 0 ? void 0 : appleLaptop.specifications();
    console.log("\nSamsung Phone Specifications:");
    samsungPhone === null || samsungPhone === void 0 ? void 0 : samsungPhone.specifications();
}
main();
