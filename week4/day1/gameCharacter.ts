
class GameCharacter {
  name: string;
  level: number;
  weapon: string;

  constructor(name: string, level: number, weapon: string) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  clone(): GameCharacter {
    return new GameCharacter(this.name, this.level, this.weapon);
  }

  public getDescription(): string {
    return `Character Details:
    Name: ${this.name}
    Level: ${this.level}
    Weapon: ${this.weapon}`;
  }
}

function main() {
  const warrior = new GameCharacter("Warrior", 10, "Sword");

  const warriorClone = warrior.clone();
  warriorClone.name = "Warrior Clone";

  console.log(warrior.getDescription());
  console.log(warriorClone.getDescription());


  console.log("Are they the same instance?", warrior === warriorClone);
}


main();
