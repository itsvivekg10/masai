function todoMiddilware (req,res,next){
    const {task, note}= req.body
    if(!task,!note){
        return res.status(500).json({res:"enter the correct data"})
    }else{
        next()
    }
}
module.exports =todoMiddilware