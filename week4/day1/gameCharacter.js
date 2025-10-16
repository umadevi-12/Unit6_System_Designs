var GameCharacter = /** @class */ (function () {
    function GameCharacter(name, level, weapon) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
    }
    GameCharacter.prototype.clone = function () {
        return new GameCharacter(this.name, this.level, this.weapon);
    };
    GameCharacter.prototype.getDescription = function () {
        return "Character Details:\n    Name: ".concat(this.name, "\n    Level: ").concat(this.level, "\n    Weapon: ").concat(this.weapon);
    };
    return GameCharacter;
}());
function main() {
    var warrior = new GameCharacter("Warrior", 10, "Sword");
    var warriorClone = warrior.clone();
    warriorClone.name = "Warrior Clone";
    console.log(warrior.getDescription());
    console.log(warriorClone.getDescription());
    console.log("Are they the same instance?", warrior === warriorClone);
}
main();
