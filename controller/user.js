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
        const user=await userModel.findOne({email});
        if(!user){
            throw new Error("User Not Found");
        }
        else{
            if(user.comparePassword(password)){
            const token=generatetokenforuser(user);
            res.cookie("token",token);
            res.json({user:user});
            }
            else{
                  throw new Error("Incorrect Passsword");
            }
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
async function handleadminregistration(req,res) {
  try{
      const {id,adminkey}=req.body;
        if(adminkey=="createnewadmin"){
            const user=await userModel.findById(id);
            user.role="admin"
            user.save();
            res.json({user:user})
        }
        else{
            throw new Error("Wrong admin key");
        }
  }
  catch(err){
    console.log(err);
    res.json({error:err.message})
  }
}

module.exports={handlesignup,handlelogin,handlelogout,handleadminregistration};