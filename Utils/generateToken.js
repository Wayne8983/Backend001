const jwt = require("jsonwebtoken");

const generateToken = async(user)=>{
    const token = await jwt.sign(
        {id:user.id,email:user.email,role:user.role},
        process.env.Secret_key,
        {expiresIn:"30s"});
    return token;
}

const refreshToken = async(user)=>{
    return await jwt.sign(
        {id:user._id},
        process.env.refresh,
        {expiresIn:"7d"}
    );
}


module.exports = {generateToken,refreshToken};