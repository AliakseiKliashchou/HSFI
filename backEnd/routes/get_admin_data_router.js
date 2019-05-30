const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const getAdminDataRouter = express.Router();

getAdminDataRouter.get('/getAdminData', async(req, res, next) => {    
    
    Admin.find({ }, (err, doc) => {
        if(err) console.log(err);
        res.json(doc);
    });
   
    
});     
     
module.exports = getAdminDataRouter;