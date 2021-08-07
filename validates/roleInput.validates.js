const enumsRole=['user','admin','supervisor']
const inputRoles=(req,res)=>{
    if(enumsRole.includes(req.body.role)==false){
        return res.status(300).json({message:"role not correct plz check role"})
    }
};
module.exports={inputRoles};