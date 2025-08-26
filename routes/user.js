const express=require('express');
const router=express.Router();
const{handlesignup,handlelogin,handlelogout,handleadminregistration}=require('../controller/user.js');

router.post('/signup',handlesignup);
router.post('/login',handlelogin);
router.post('/logout',handlelogout);
router.post('/adminreg',handleadminregistration)

module.exports=router;