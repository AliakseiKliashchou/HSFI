const express = require('express');
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
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        stars: req.body.stars,
        
    },
    {new: true},
    function(err, vendor){
        if(err){ return console.log(err)};
        console.log(vendor);
    });
    
    res.json({message: 'Ok!'});
 
});

module.exports = changeVendorProfileRouter;