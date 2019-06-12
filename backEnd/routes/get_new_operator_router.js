const express = require('express');
const User = require('../models/user');

const getNewOperatorRouter = express.Router();

getNewOperatorRouter.get('/getNewOperator', async(req, res, next) => { 
    
    User.findOne({email: req.query.email}, (err, doc) => {
        if(err){console.log(err);}
        User.find({activity: 'wait', role: 'operator', country: doc.country}, (err, doc) => {
            if(err){console.log(err);}            
            res.json(doc);
        });
    });   

    
   
    
});     
     
module.exports = getNewOperatorRouter; 