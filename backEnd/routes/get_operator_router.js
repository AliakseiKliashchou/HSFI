const express = require('express');
const User = require('../models/user');

const getOperatorRouter = express.Router();

getOperatorRouter.post('/getOperator', async(req, res, next) => {   
    
    const user = await User.findOne({ email : req.body.email });   
    res.json({user : user});
    
});     
     
module.exports = getOperatorRouter;