const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');
const VendorCard = require('../models/vendorCard');

const viewVendorRouter = express.Router();

viewVendorRouter.post('/viewVendor', async(req, res, next) => {  
    var findingData = [];    
    Vendor.find(req.body, (err, doc) => {
        if(err){
            console.log(err);
            res.json({message: err});
        }         
        if(req.query.openClosedStatus == 'open'){            
            for(let i = 0; i < doc.length; i++){
                for(let j = 0; j < doc[i].businessSchedule[0].length; j++){
                    if(doc[i].businessSchedule[0][j] == req.query.currentDay){
                        findingData.push(doc[i]);
                    }
                }
            }
            res.json(findingData);   
        }else if(req.query.openClosedStatus == 'closed'){            
            console.log(findingData);
            for(let i = 0; i < doc.length; i++){
                for(let j = 0; j < doc[i].businessSchedule[0].length; j++){
                    if(doc[i].businessSchedule[0][j] == req.query.currentDay){
                        findingData.splice(i, 1);
                    }else findingData.push(doc[i]);
                }
            }
            console.log(findingData);
            res.json(findingData); 
        }else res.json(doc);       
        
    }); 
      
  
});
     
module.exports = viewVendorRouter;