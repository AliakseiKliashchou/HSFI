const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const changeProfileRouter = express.Router();

changeProfileRouter.post('/changeProfile', async(req, res, next) => {      
 
    if(!req.body.password){       
        User.findOneAndUpdate({email: req.body.email}, {
            name: req.body.name, 
            email: req.body.email, 
            country: req.body.country,
            phone: req.body.phone,
            organization: req.body.organization,
        },
        {new: true},
        function(err, user){
            if(err){ return console.log(err)};
            res.json(user);
        });
    }else{       
        const passwordFromUser = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const passwordToSave = bcrypt.hashSync(passwordFromUser, salt);       
        User.findOneAndUpdate({email: req.body.email}, {
            name: req.body.name, 
            email: req.body.email, 
            country: req.body.country,
            phone: req.body.phone,
            password: passwordToSave,
        },
        {new: true},
        function(err, user){
            if(err){ return console.log(err)};            
            res.json(user);
        });
    }
    
    

 
});

module.exports = changeProfileRouter;