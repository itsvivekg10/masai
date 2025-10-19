
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
}

function main(): void {
  const warrior = new GameCharacter("Warrior", 10, "Sword");

  const warriorClone = warrior.clone();
  warriorClone.name = "Warrior Clone";

  console.log("Original Character:", warrior);
  console.log("Cloned Character:", warriorClone);

  console.log("Are they the same instance?", warrior === warriorClone);
}

main();
