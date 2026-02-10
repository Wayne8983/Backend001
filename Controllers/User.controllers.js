const { hash } = require('bcrypt');
const Users = require('../Models/user.models');
const {HashPassword,confirmHash} = require('../Utils/hashpassword');
const UserSchema = require('../Utils/joi');
const jwt = require("jsonwebtoken");
const generateToken = require('../Utils/generateToken');

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

        return res.json({token,message:"Login successful"});
    }catch(err){
        console.log(err.message);
    }
}





module.exports = {registerUser,allUsers,DeleteUser,login,FindUser};