const express = require('express');
const User = require('../models/user');

const getNewNpcRouter = express.Router();

getNewNpcRouter.get('/getNewNpc', async(req, res, next) => {    
    
   User.find({activity: 'wait', role: 'npc'}, (err, doc) => {
       if(err){console.log(err);}       
       res.json(doc);
   });
    
});     
     
module.exports = getNewNpcRouter;