class Person {
userName:string;
age:number
constructor(userName:string,  age:number){
    this.userName=userName;
this.age=age
}
greet():string{
return `hello my name is ${this.userName} and my age is ${this.age}`
}
}

let person1 = new Person("rahul",19)
console.log(person1.greet())