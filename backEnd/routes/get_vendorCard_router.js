const express = require('express');
const VendorCard = require('../models/vendorCard');
const getVendorCardRouter = express.Router();

getVendorCardRouter.post('/getVendorCard', async(req, res, next) => {       
    const vendorCard = await VendorCard.findOne({ serialNumber: req.body.serialNumber });    
    res.json({vendorCard : vendorCard}); 
    
});     
     
module.exports = getVendorCardRouter;