const express = require('express');
const User = require('../models/user');

const changeNewNpcRouter = express.Router();

changeNewNpcRouter.post('/changeNewNpc', async(req, res, next) => {    
  if(req.body.activity == 'active'){
    User.findOneAndUpdate(
        {_id: req.body._id},
        {activity: req.body.activity},
        {new: true},
        (err, doc) => {
          if(err){console.log(err);}
          res.json({message: 'It`s OK'});
      });
  } 
  if(req.body.activity == 'passive'){
    User.findOneAndDelete({_id:req.body._id}, (err, doc) => {
        if(err){console.log(err);}
        res.json({message: 'The user was deleted'});
    });
  } 
  
    
});     
     
module.exports = changeNewNpcRouter;