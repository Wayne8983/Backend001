const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    const bearer = req.headers.authorization;

    if(!bearer) {
        return res.status(401).json({success:false,message:"No token provided"});
    }
    const token = bearer.split(" ")[1];

    try{
        const decoded = await jwt.verify(token,process.env.Secret_key);
        req.user = decoded;
        next();
    }catch(err){
        return res.json({error:err.message});
    }


}

module.exports= verifyToken;