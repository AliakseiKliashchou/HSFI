const express = require('express');
const Admin = require('../models/admin');

const getAdminDataRouter = express.Router();

getAdminDataRouter.get('/getAdminData', async(req, res, next) => {    
    
    Admin.find({ }, (err, doc) => {
        if(err) console.log(err);
        res.json(doc);
    });
   
    
});     
     
module.exports = getAdminDataRouter;