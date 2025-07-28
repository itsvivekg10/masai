let outerFunc = function (){
    let message = "hello"
    function innerFunction(name) {
        return message + " "+name
    }
return innerFunction
}
let v= outerFunc()
console.log(v("vivek"))