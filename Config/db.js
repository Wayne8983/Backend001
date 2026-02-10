const mongoose = require("mongoose");

const connectdb= async ()=>{
    try{
    const connection = await mongoose.connect(process.env.MONGO_URL);
    return console.log("Database connected Successfully✅✅");
    }catch(err){
        console.log(err.message);
    }
};

module.exports = connectdb;