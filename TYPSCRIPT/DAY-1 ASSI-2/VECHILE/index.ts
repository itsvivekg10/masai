class vechiles{
    brand:string;
    speed:number;
constructor(brand:string, speed:number){
this.brand=brand,
this.speed=speed
}
drive():void{
    console.log(`this car run at the speed of ${this.speed}`)
}
}

class car extends vechiles{
fuelType:string;

constructor(brand:string,speed:number,fuelType:string){
    super(brand,speed);
    this.fuelType=fuelType
}

fuelRefiel():void{
    console.log(`this car is ${this.brand} run at the speed of ${this.speed} per hr and fuel is ${this.fuelType}`)
}
}

const car1 = new car("rangerover",2000,'prtrol')
console.log(car1.fuelRefiel())