const express = require('express');
const Admin = require('../models/admin');

const changeAdminDataRouter = express.Router();

changeAdminDataRouter.post('/changeAdminData', async(req, res, next) => {    

if(req.body.target == 'countries'){
    Admin.findOneAndUpdate({flag: 'first'},{countries: req.body.countries},{new: true},(err, doc)=>{
        if(err){console.log(err);}
        res.json({message: 'Country was successfully changed'});
    });
}
if(req.body.target == 'foodGroups'){
    Admin.findOneAndUpdate({flag: 'first'},{foodGroups: req.body.foodGroups},{new: true},(err, doc)=>{
        if(err){console.log(err);}
        res.json({message: 'Food groups was successfully changed'});
    });
}
if(req.body.target == 'organizations'){
    Admin.findOneAndUpdate({flag: 'first'},{organizations: req.body.organizations},{new: true},(err, doc)=>{
        if(err){console.log(err);}
        res.json({message: 'Organizations was successfully changed'});
    });
}  
if(req.body.target == 'questions'){
    Admin.findOneAndUpdate({flag: 'first'},{questions: req.body.questions},{new: true},(err, doc)=>{
        if(err){console.log(err);}
        res.json({message: 'Questions was successfully changed'});
    });
}
    
});     
     
module.exports = changeAdminDataRouter;