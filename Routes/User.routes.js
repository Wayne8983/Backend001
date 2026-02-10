const express = require("express");
const router = express.Router();
const {registerUser,allUsers, DeleteUser, login, FindUser} = require("../Controllers/User.controllers");
const verifyToken = require("../Middleware/authmiddleware");
const authorizeRoles = require("../Middleware/isAdmin");



router.post('/register',registerUser);
router.get('/Users',allUsers);
router.delete('/Delete',DeleteUser);
router.post('/login',login);
router.get('/finduser',FindUser);

router.get('/profile',verifyToken,(req,res)=>{
    res.json({
        message:"Welcome User",
        user:req.user
    });
})
router.get('/admin',verifyToken,authorizeRoles("admin","User"),(req,res)=>{
    res.json({
        message:"Welcome Admin",
        user:req.user
    });
})



module.exports=router;