function createCar(make,model,year){
    let obj ={}
        obj.make=make,
        obj.model=model,
        obj.year=year
        obj.describeCar=function(){
            return `This is a  ${this.year} car`
        }
    
    return obj
}
let car = createCar("toyta","camry",2022)
console.log(car.describeCar())