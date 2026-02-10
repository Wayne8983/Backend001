const { required } = require("joi");
const { types } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:"String",
        required:true
    },
    Descriptions:{
        type:"String",
        required:true
    },
    Price:{
        type:Number
    },
    Category:{
        type:"String"
    },
    Status:{
        type:"String"
    }
});

module.exports = mongoose.model('Products',productSchema);