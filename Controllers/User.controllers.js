const { hash } = require('bcrypt');
const Users = require('../Models/user.models');
const {HashPassword,confirmHash} = require('../Utils/hashpassword');
const UserSchema = require('../Utils/joi');
const jwt = require("jsonwebtoken");
const {generateToken,refreshToken} = require('../Utils/generateToken');

const allUsers = async(req,res)=>{
    const users = await Users.find({});
    return res.json(users);
}

const FindUser = async(req,res)=>{
    const {email} = req.body;
    const user = await Users.findOne({email});
    if(!user) return res.json({message:"User not found"});
    return res.json(user);
}



const DeleteUser = async(req,res)=>{
    const {email} = req.body;
    try{
        
        const deleteuser = await Users.findOneAndDelete({email});
        if(!deleteuser) return res.json({message:"User does not exists"});
        res.status(200).json({message:"User deleted succesfully"});

    }catch(err){
        console.log(err.message);
    }

}

const registerUser = async (req,res)=>{
    
    try{
        const {firstName,LastName,SurName,age,email,password} = req.body;
        const {error,value} = UserSchema.validate(req.body);
        if(error){
            return res.status(400).json({message:error.message});
        };

        const user = await Users.findOne({email});
        if(user) return res.status(409).json({message:"User already exits"});

        const hash = await HashPassword(password);

        const newUser= await Users.create({
            firstName,
            LastName,
            SurName,
            age,
            email,
            password:hash,
            role :"User"
        });
        

        return res.status(201).json({message:"User Registered Succesfully"});
    }catch(err){
        res.json(err.message);
    }
};

const login = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password) return res.json({message:"All fields required"});
    try{
        const user = await Users.findOne({email});
        if(!user){
            return res.json({message:"invalid Credentials"});
        }
        const ismatch = await confirmHash(password,user.password);
        if(!ismatch) {
            return res.json({message:"invalid Credentials"});
        }
        const token = await generateToken(user);
        const refreshToken = jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.refresh,
            {expiresIn:"7d"}
        );
        

        user.refreshToken =refreshToken;
        await user.save();

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });

        res.status(200).json({
            success:true,
            message:"Login Successful",
            token,
            refreshToken
        });



    }catch(err){
        res.status(500).json(
            {
                error:err.message
            }

        );
    }
};

const userRefreshToken = async(req,res)=>{
    const token = req.cookies.refreshToken;
    console.log(token);
    if(!token){
        return res.sendStatus(401);
    }
    try{
        const decoded = jwt.verify(token,process.env.refresh);
        const user = await Users.findById(decoded.id);
        console.log(user);
        if(!user || user.refreshToken !==token){
            return res.sendStatus(403);
        };

        const newAccessToken = jwt.sign(
            {id:user._id,role:user.role},
            process.env.Secret_key,
            {expiresIn:"15m"}
        );
        res.status(200).json({
            newAccessToken
        })

    }catch(err){
        res.json({
            error:err.message
        })
    }
};


const logOut = async(req,res)=>{
    const token = req.cookies.refreshToken;
    if(token){
        const user = await Users.findOne({refreshToken:token})
        if(user){
            user.refreshToken=null;
            await user.save();
        }

    }
    res.clearCookie("refreshToken");
    res.status(200).json({
        message:"logout successful"
    });
}





module.exports = {registerUser,allUsers,DeleteUser,login,FindUser,userRefreshToken,logOut};