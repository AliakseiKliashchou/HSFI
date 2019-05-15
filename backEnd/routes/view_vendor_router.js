const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');
const VendorCard = require('../models/vendorCard');

const viewVendorRouter = express.Router();

viewVendorRouter.post('/viewVendor', async(req, res, next) => {     
   //console.log(req.body);
   Vendor.find(req.body, (err, doc) => {
       if(err){
           console.log(err);
           res.json({message: err});
       } 
       console.log(doc); 
       res.json(doc);
   }); 
});
     
module.exports = viewVendorRouter;