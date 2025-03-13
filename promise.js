function placeOrder(){
    return new Promise((resolve)=>{
        let orderId = 
        resolve( Math.floor( Math.random()*100));
    })
}
function processOrder(order){
    return new Promise((resolve)=>{
        resolve( Math.floor( Math.random()*100));
    })
}
function processingCode(){
    return new Promise((resolve)=>{
        resolve(Math.floor(Math.random()*100))
    })
}
function confirmationCode(){
    return new Promise((resolve)=>{
        resolve(Math.floor(Math.random()*100))
    })
}
function finalResult(){
    return new Promise((resolve)=>{
        resolve(Math.floor(Math.random()*100))
    })
}


 placeOrder().then(processOrder).then(processingCode).



//console.log(num)