const Actor = require('../model/actor.model');
const {inputRoles}=require('../validates/roleInput.validates');

const upgradeRole = async (req, res) => {
    try {
        const { id } = req.body;
        inputRoles(req,res);
        let foundUser = await Actor.findOne({ _id: id });
        if (!foundUser) {
            return res.status(300).json({ message: "Cant find this user" });
        }
        await Actor.findOneAndUpdate({ _id: id }, { role: req.body.role });
        return res.status(200).json({ message: "upgrade role success" });
    } catch (err) {
        return err;
    }
};
const viewListProfile = async (req, res) => {
    try {
        let listActor = await Actor.find({}).select('name _id birthDate address role');
        return res.status(200).json({ message: "List user success", result: listActor });
    } catch (err) {
        return err;
    }
}
const viewProfile = async (req, res) => {
    try {
        let listActor = await Actor.findOne({ _id: req.query.id }).select('name _id birthDate address role');
        if (listActor) {
            return res.status(200).json({ message: "List user success", result: listActor });
        }else{
            return res.status(300).json({message:"Cant find user with id"})
        }
    } catch (err) {
        return err;
    }
}
module.exports = { upgradeRole,viewListProfile,viewProfile};
