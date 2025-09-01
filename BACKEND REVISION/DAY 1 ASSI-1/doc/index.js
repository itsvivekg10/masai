const fs = require("fs")

fs.readFile("data.txt","utf8",(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

fs.create("data1.txt",(err,data)=>{
    if(err)
})
console.log("hello")