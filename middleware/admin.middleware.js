const {jwtSecret}=require('../config/value.config');
const JWT=require('jsonwebtoken');
const Actor = require('../model/actor.model');
const checkRoleAdmin=async(req,res,next)=>{
    if (req.headers && req.headers.authorization) {
        const authorization = req.headers.authorization.split(' ')[1];
        let decoded;
        try {
            decoded = JWT.verify(authorization, jwtSecret);
        } catch (err) {
            console.log(err);
            return res.status(400).send('unauthorized');
        }
        let role = decoded.role;
        if(role=='admin'){
            next();
        }else{
            return res.status(400).json({message:"This user dont have permission"});
        }
    }
};
module.exports={checkRoleAdmin};