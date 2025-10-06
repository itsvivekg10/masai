class Student {
    name:string;
    age:number;
    roll:number

    constructor(name:string,age:number,roll:number){
        this.name=name;
        this.age=age;
        this.roll=roll

    }
    displayDetails():string{
        return `name:${this.name}; age:${this.age};roll.no:${this.roll}  `
    }
}
let Student1 = new Student("vivek",22,123)
let Student2 = new Student("vivek2",21,121)
console.log(Student1.displayDetails())
console.log(Student2.displayDetails())