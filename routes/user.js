const express=require('express');
const router=express.Router();
const{handlesignup,handlelogin,handlelogout}=require('../controller/user.js');

router.post('/signup',handlesignup);
router.post('/login',handlelogin);
router.post('/logout',handlelogout);

module.exports=router;