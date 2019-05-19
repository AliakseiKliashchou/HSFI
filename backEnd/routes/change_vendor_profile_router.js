const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Vendor = require('../models/vendor');


const changeVendorProfileRouter = express.Router();

changeVendorProfileRouter.post('/changeVendorProfile', async(req, res, next) => {      
 
    Vendor.findOneAndUpdate({_id: req.body._id}, {
        name: req.body.name, 
        licenceNumber: req.body.licenceNumber, 
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        foodGroup: req.body.foodGroup,
        oss: req.body.oss,
        
    },
    {new: true},
    function(err, vendor){
        if(err){ return console.log(err)};
        console.log(vendor);
    });
    
    res.json({message: 'Ok!'});
 
});

module.exports = changeVendorProfileRouter;