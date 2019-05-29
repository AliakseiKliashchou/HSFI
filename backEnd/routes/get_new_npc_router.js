const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getNewNpcRouter = express.Router();

getNewNpcRouter.get('/getNewNpc', async(req, res, next) => {    
    
   User.find({activity: 'wait', role: 'npc'}, (err, doc) => {
       if(err){console.log(err);}
       console.log(doc);
       res.json(doc);
   });
    
});     
     
module.exports = getNewNpcRouter;