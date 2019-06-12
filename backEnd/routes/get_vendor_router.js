const express = require('express');
const Vendor = require('../models/vendor');
const getVendorRouter = express.Router();

getVendorRouter.post('/getVendor', async(req, res, next) => {    
    
    const vendor = await Vendor.findOne({ licenceNumber: req.body.licenceNumber });    
    res.json({vendor : vendor});
    
});     
     
module.exports = getVendorRouter;