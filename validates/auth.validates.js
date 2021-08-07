
const inputRegister=(req,res)=>{
    const {name,birthDate,phone,address,role,password}=req.body;
    if(name==undefined||name==""){
        return res.status(300).json({result:"Name is required"});
    }
    if(birthDate==undefined||birthDate==""){
        return res.status(300).json({result:"birthDate is required"});
    }
    if(phone==undefined||phone==""){
        return res.status(300).json({result:"phone is required"});
    }
    if(address==undefined||address==""){
        return res.status(300).json({result:"address is required"});
    }
    // if(role==undefined||role==""){
    //     return res.status(300).json({result:"role is required"});
    // }
    if(password==undefined||password==""){
        return res.status(300).json({result:"password is required"});
    }
};
module.exports={inputRegister}