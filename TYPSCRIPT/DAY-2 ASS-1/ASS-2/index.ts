class PolyDuck {
  fly(): void {
    console.log("A duck is flying...");
  }
}

class DesiDuck extends PolyDuck {
  fly(): void {
    console.log("DesiDuck flies at 10kmph");
  }
}

class VidesiDuck extends PolyDuck {
  fly(): void {
    console.log("VidesiDuck flies at 20kmph");
  }
}

class SmartDuck extends PolyDuck {
  fly(): void {
    console.log("SmartDuck flies at 50kmph");
  }
}

// Function that accepts any PolyDuck
function makeDuckFly(duck: PolyDuck): void {
  duck.fly();
}


const desi = new DesiDuck();
const videsi = new VidesiDuck();
const smart = new SmartDuck();

makeDuckFly(desi);
makeDuckFly(videsi);
makeDuckFly(smart);
class User {
  public name: string;
  private orgCode: string = "DuckCorp";
  protected role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }

  introduce(): void {
    console.log(`I am ${this.name} from ${this.orgCode}`);
  }
}

class Manager extends User {
  getRole(): void {
    console.log(this.role); 
  }
}

const user = new User("Daffy", "Employee");
user.introduce(); 

const manager = new Manager("Donald", "Manager");
manager.introduce(); 
manager.getRole();


