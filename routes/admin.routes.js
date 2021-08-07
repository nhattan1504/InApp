const express=require('express');
const router=express.Router();
const {checkRoleAdmin}=require('../middleware/admin.middleware');
const AdminController=require('../controller/admin.controller');
router.post('/suspendUser',checkRoleAdmin,AdminController.suspendUser);
router.post('/upgradeUser',checkRoleAdmin,AdminController.upgradeUser);
module.exports=router;