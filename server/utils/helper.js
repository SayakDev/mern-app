const jwt = require("jsonwebtoken");

const generateToken = (payload)=>{
    console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 *3600});
    return token;
}

const validateToken = (token)=>{
    try {
        
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded){
            return {status: 1}
        }else{
            return {status: 0}
        }
      } catch(err) {
        return {status: 0}
      }
}

module.exports = {generateToken, validateToken};