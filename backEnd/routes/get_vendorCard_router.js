const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const VendorCard = require('../models/vendorCard');

const getVendorCardRouter = express.Router();

getVendorCardRouter.post('/getVendorCard', async(req, res, next) => {    
    console.log('req');
    const vendorCard = await VendorCard.findOne({ serialNumber: req.body.serialNumber });
    console.log(vendorCard);
    res.json({vendorCard : vendorCard}); 
    
});     
     
module.exports = getVendorCardRouter;