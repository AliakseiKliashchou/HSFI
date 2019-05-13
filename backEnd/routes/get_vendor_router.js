const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');

const getVendorRouter = express.Router();

getVendorRouter.post('/getVendor', async(req, res, next) => {    
    
    const vendor = await Vendor.findOne({ licenceNumber: req.body.licenceNumber });
    //console.log(user);
    res.json({vendor : vendor});
    
});     
     
module.exports = getVendorRouter;