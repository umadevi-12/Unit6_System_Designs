class Printable {
print() {
throw new Error("print() must be implemented");
}
}


class Scannable {
scan() {
throw new Error("scan() must be implemented");
}
}


class Faxable {
fax() {
throw new Error("fax() must be implemented");
}
}

class OldPrinter extends Printable {
print() {
console.log("OldPrinter: Printing document");
}
}


class SmartPrinter extends Printable {
print() {
console.log("SmartPrinter: Printing document");
}
}


Object.assign(SmartPrinter.prototype, Scannable.prototype);
Object.assign(SmartPrinter.prototype, Faxable.prototype);


SmartPrinter.prototype.scan = function() {
console.log("SmartPrinter: Scanning document");
};


SmartPrinter.prototype.fax = function() {
console.log("SmartPrinter: Sending fax");
};

const oldPrinter = new OldPrinter();
oldPrinter.print(); 

const smartPrinter = new SmartPrinter();
smartPrinter.print(); 
smartPrinter.scan(); 
smartPrinter.fax(); 