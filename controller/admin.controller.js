const Actor = require('../model/actor.model');

const suspendUser = async(req, res) => {
    try {
        const {id}=req.body;
        console.log("req.body",id);
        let foundUser=await Actor.findOne({_id:id});
        console.log("user",foundUser)
        if(!foundUser){
            return res.status(300).json({message:"Cant find this user"});
        }
        if(foundUser.role=="admin"||foundUser.role=="supervisor"){
            return res.status(300).json({message:"Dont permission for this user"});
        }
        await Actor.findOneAndUpdate({$and:[{_id:id},{role:{$nin:['supervisor','admin']}}]},{active:false});
        return res.status(200).json({message:"Lock user success"});
    } catch (err) {
        return err;
    }
};
const upgradeUser=async(req,res)=>{
    try {
        const {id}=req.body;
        let foundUser=await Actor.findOne({_id:id});
        if(!foundUser){
            return res.status(300).json({message:"Cant find this user"});
        }
        await Actor.findOneAndUpdate({_id:id},{role:'admin'});
        return res.status(200).json({message:"upgrade user success"});
    } catch (err) {
        return err;
    }
};
module.exports={suspendUser,upgradeUser};
