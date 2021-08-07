const express=require('express');
const router=express.Router();
const {checkRoleSupervisor}=require('../middleware/supervisor.middleware');
const SupervisorController=require('../controller/supervisor.controller');
router.post('/upgradeRole',checkRoleSupervisor,SupervisorController.upgradeRole);
router.get('/listProfile',checkRoleSupervisor,SupervisorController.viewListProfile);
router.get('/viewProfile',checkRoleSupervisor,SupervisorController.viewProfile);
module.exports=router;