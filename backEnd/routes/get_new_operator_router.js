const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getNewOperatorRouter = express.Router();

getNewOperatorRouter.get('/getNewOperator', async(req, res, next) => { 
    console.log(req.query.email);
    User.findOne({email: req.query.email}, (err, doc) => {
        if(err){console.log(err);}
        User.find({activity: 'wait', role: 'operator', country: doc.country}, (err, doc) => {
            if(err){console.log(err);}
            
            res.json(doc);
        });
    });   

    
   
    
});     
     
module.exports = getNewOperatorRouter; 