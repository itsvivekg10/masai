let sentencBuilder={
    subject:"i",
    verb:"am",
    object:"coding",
    fun:function(){
        let sentence= `${this.subject} ${this.verb} ${this.object}`
        return sentence
    }
}

console.log(sentencBuilder.fun())