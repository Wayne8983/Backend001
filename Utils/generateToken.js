const jwt = require("jsonwebtoken");

const generateToken = async(user)=>{
    const token = await jwt.sign(
        {id:user.id,email:user.email,role:user.role},
        process.env.Secret_key,
        {expiresIn:"10m"});
    return token;
}


module.exports = generateToken;