const mongoose = require('mongoose');
const Actor=require('../model/actor.model');
const {inputRegister}=require('../validates/auth.validates');
const JWT= require('jsonwebtoken');
const signToken=(account)=>{
    return JWT.sign({
        iss:'inapps',
        sub:account._id,
        role:account.role
    },process.env.JWT_KEY);
}
const register=async (req,res)=>{
    try{
        inputRegister(req,res);
        let foundExistPhone= await Actor.findOne({phone:req.body.phone});
        if(foundExistPhone){
            return res.status(300).json({message:"This phone is registed"});
        }
        let newActor= new Actor({
            _id: new mongoose.Types.ObjectId,
            ...req.body,
            active:true,
        });
        await newActor.save(function(err,result){
            if(err){
                console.log("err",err)
            }
            console.log(result)
        });
        return res.status(200).json({message:"Register success"});
    }
    catch(err){
        return err;
    }
}
//Login
const login=async(req,res)=>{
    try{
        let foundUser= await Actor.findOne({phone:req.body.phone});
        if(!foundUser){
            return res.status(400).json({message:"phone dont exist"});
        }
        let isMatch= await foundUser.isValidPassword(req.body.password);
        if(isMatch){
            let token=signToken(foundUser);
            return res.status(200).json({message:"LOgin success",token:token});
        }
        return res.status(400).json({message:"wrong password"});
    }
    catch(err){
        return err;
    }
}
module.exports={register,login};