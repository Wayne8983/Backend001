const products = require("../Models/product.models");

const Products = async(req,res)=>{
    const allproducts = await products.find({});
    res.json(allproducts);
}

const addProducts = async(req,res)=>{
    const {productName,Descriptions,Price,Category,Status}=req.body;
    if(!productName||!Descriptions||!Price||!Category||!Status) return res.json({message:"All field required"});
    try{
        const newProduct = await products.create({productName,Descriptions,Price,Category,Status});
        
        return res.json(newProduct);
    }catch(err){
        console.log(err.message);
    }
}

const deleteProduct = async(req,res)=>{
    const productid = req.params.id;
    const findProduct = await products.findByIdAndDelete(productid);
    if(!findProduct) return res.json({message:"Product not found"});
    return res.json({message:"Product deleted successfully"});
};

const updateProduct = async (req,res)=>{
    const productId = req.params.id;
    const updates = req.body;
    const findProduct = await products.findByIdAndUpdate(productId,updates,{new:true});
    if(!findProduct) return res.json({message:"Invalid Product"});
    return res.json(findProduct);
}






module.exports = {Products,addProducts,deleteProduct,updateProduct};