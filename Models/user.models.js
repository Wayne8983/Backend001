const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    firstName:{
        type:"String",
        required: true
    },
    LastName:{
        type:"String",
        required: true
    },
    SurName:{
        type:"String",
        required: true
    },
    age:{
        type:"number",
        required: true
    },
    email:{
        type:"String",
        required: true
    },
    password:{
        type:"String",
        required: true
    },
    role:{
        type:"string",
        enum:["User","admin"],
        default:"User",
        required:true
    },
    refreshToken:{
        type:"string"
    }

},
    {
        timestamps:true
    }
);

module.exports = mongoose.model('User',Userschema);