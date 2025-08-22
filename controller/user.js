const userModel=require('../models/user.js');
const{generatetokenforuser}=require('../services/authentication.js');
const express=require('express');

async function handlesignup(req,res) {
    try{
        const{name,email,password}=req.body;
        const isEmail=await userModel.findOne({email});
        if(isEmail){
            throw new Error("User Already Exists");
        }
        const newUser=await userModel.create({
            name,email,password
        })
        const token=generatetokenforuser(newUser);
        res.cookie("token",token);
        res.json({token:token,user:newUser});
    }
    catch(err){
        console.log(err);
    }
}
async function handlelogin(req,res) {
try{
            const{email,password}=req.body;
        const user=await userModel.findOne({email,password});
        if(!user){
            throw new Error("Incorrect email or Password");
        }
        else{
            const token=generatetokenforuser(user);
            res.cookie("token",token);
            res.json({success:"Login successfull"});
        }
}
catch(err){
    console.log(err.message);
    res.json({error:err.message})
}
}
async function handlelogout(req,res) {
    try{
        res.clearCookie('token');
        res.json({success:"Logout was success full"})
    }
    catch(err){
        console.log(err);

    }
}

module.exports={handlesignup,handlelogin,handlelogout};