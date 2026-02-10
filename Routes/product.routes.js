const express = require("express");
const { Products, addProducts, deleteProduct, updateProduct } = require("../Controllers/product.controllers");
const verifyToken = require("../Middleware/authmiddleware");
const router = express.Router();

router.get('/allproducts',verifyToken,Products);
router.post('/newproduct',addProducts);
router.delete('/delete/:id',deleteProduct);
router.patch('/update/:id',updateProduct);



module.exports = router;