const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');
const VendorCard = require('../models/vendorCard');

const reportRouter = express.Router();

reportRouter.post('/report', async(req, res, next) => {     
   var findingData = {
       0: '',
       1: '',
       2: '',
       3: '',
       4: '',
       5: '',
       6: '',
       7: ''
   };
     for(let i = 0; i < 8; i++){
//Main logic. Here is proccess incoming data from client side.        
       if(req.body[i] == 'Registered vendors'){
        Vendor.find({}, (err, doc) => {
            if(err){console.log(err);}
            findingData[i] = doc.length;           
        });
       }
       
    }
    //console.log(findingData); 
    await res.json(findingData);
});


module.exports = reportRouter;