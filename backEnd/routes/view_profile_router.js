const express = require('express');
const User = require('../models/user');

const viewProfileRouter = express.Router();

viewProfileRouter.post('/viewProfile', async(req, res, next) => {     
    const user = await User.findOne({ email : req.body.email });   
    res.json({user : user}); 
});

module.exports = viewProfileRouter;

