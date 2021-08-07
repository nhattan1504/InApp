const mongoose=require('mongoose');
const roles=['admin','supervisor','user']
const bcrypt=require('bcrypt');
const newActorSchema= new mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    name:{type:String,required:true},
    birthDate:{type:Date, required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    role:{type:String,enum:roles,required:true,default:"user"},
    active:{type:Boolean,required:true,default:true},
    password:{type:String,required:true}
});
newActorSchema.pre('save',async function(next){
    try{
        console.log("Inter save");
        const actor=this;
        if(!actor.isModified('password')){
            next();
        }
        const salt = await bcrypt.genSalt(10);
		// Generate a password hash (salt + hash)
		const passwordHash = await bcrypt.hash(this.password, salt);
		// Re-assign hashed version over original, plain text password
		this.password = passwordHash;
		console.log('exited');
		next();
    }catch(err){
        next(err);
    }
})
newActorSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};
const newActor= mongoose.model('Actor',newActorSchema,'Actor');
module.exports=newActor;
