var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Book = /** @class */ (function () {
    function Book(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = __spreadArray([], reviews, true);
    }
    Book.prototype.clone = function () {
        var clonedReviews = __spreadArray([], this.reviews, true);
        return new Book(this.title, this.author, clonedReviews);
    };
    Book.prototype.printBook = function () {
        console.log("Title: ".concat(this.title));
        console.log("Author: ".concat(this.author));
        console.log("Reviews: ".concat(this.reviews.join(", ")));
    };
    return Book;
}());
function main() {
    var original = new Book("TypeScript Patterns", "Jane Doe", [
        "Great book",
        "Very informative",
    ]);
    var cloned = original.clone();
    cloned.title = "TypeScript Patterns - Clone";
    cloned.reviews.push("Must-read for devs");
    console.log("Original Book:");
    original.printBook();
    console.log("\nCloned Book:");
    cloned.printBook();
    console.log("\nAre original and clone same instance?", original === cloned);
}
main();
