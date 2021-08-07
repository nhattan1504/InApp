const nodeSchedule = require('node-schedule');
const Actor=require('../model/actor.model');

async function sendNotification(){
    let nowDate= new Date(Date.now());
    let day=nowDate.getDay(nowDate);
    let month=nowDate.getMonth(nowDate);
    Actor.find({}).exec((err,result)=>{
        if(err){
            console.log("error",err);
        }else{
            var listUserBd=[];
            for(var x=0;x< result.length;x++){
                let date= new Date(result[x].birthDate);
                if(day==date.getDay()&&month==date.getMonth()){
                    listUserBd.push(result[x]);
                }
            }
            for(var y=0;y<listUserBd.length;y++){
                console.log("send notification",listUserBd[x].name);
            }
        }
    })
}
module.exports.cronjob=()=>{
    nodeSchedule.scheduleJob({hour:7,minute:0},async()=>{
        await sendNotification();
    });
}