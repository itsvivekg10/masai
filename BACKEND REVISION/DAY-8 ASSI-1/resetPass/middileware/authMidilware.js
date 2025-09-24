const jwt = require("jsonwebtoken")
const authMiddilware = (req,res,next)=>{
   let token = req.headers.authorization.split(" ")[1]
   if(token){
    let decode = jwt.verify(token,"f715ff48dc9efbfd9b89180ffb7366de0c0646869e5a73cf7404751460b6abf3cfc240005c910d4c5b4ed4c77194b5d95a0601efb47d724aeb0f516287037a57")
 if(decode){
next()
 }else{
    res.status(401).json({"res":"wrong request"})
 }

   }else{
    res.status(401).json({"res":"wrong request"})
   }
    
}
module.exports = authMiddilware