const joi = require("joi");

const UserSchema = joi.object({
    firstName:joi.string().min(4).max(100).required(),
    LastName:joi.string().min(4).max(100).required(),
    SurName:joi.string().min(4).max(100).required(),
    age:joi.number().required() ,
    email:joi.string().email().required(),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
});


module.exports = UserSchema;