const express = require('express');
const Vendor = require('../models/vendor');

const getAllVendorsRouter = express.Router();

getAllVendorsRouter.get('/getAllVendors', async(req, res, next) => {    
    
    Vendor.find({ }, (err, doc) => {
        if(err) console.log(err);
        res.json(doc);
    });
   
    
});     
     
module.exports = getAllVendorsRouter;