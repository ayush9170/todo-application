
const jwt = require("jsonwebtoken");
const{JWT_USER_SCERET} =require("../confi")


function mid_auth(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

const decode = jwt.verify(token,JWT_USER_SCERET);

if(decode){
  req.id =decode.id;
  next();
}
else{
    res.status(403).json({
        message: "you are not signed in"
    })
}
}

module.exports={
 mid_auth
}