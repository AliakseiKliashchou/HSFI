const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');
const VendorCard = require('../models/vendorCard');

const hotlineRouter = express.Router();

hotlineRouter.post('/hotline', async(req, res, next) => {     
    
    VendorCard.findOne({serialNumber: req.body.serialNumber}, (cardErr, card) => {
        if(cardErr){
            console.log(cardErr);
            res.json({message: cardErr});
        }         
        Vendor.findOne({licenceNumber: card.licenceNumber}, (VendorErr, vendor) => {
            if(VendorErr){
                console.log(VendorErr);
                res.json({message: VendorErr});
            }
            //Push new callDate 
            let currentDate = req.body.callDate;            
            let callDate = vendor.callDate;           
            callDate.push(currentDate);
            //Push new callerID
            let currentID = req.body.callerID;
            let callerID = vendor.callerID;
            callerID.push(currentID);
            //Check flag
            let flag = vendor.flag;
            if(flag == ''){
                flag = 'isFlagged';
            }
            //Increment and check callCount
            let callCount = vendor.callCount;
            
            if(callCount >= 3){
                flag = 'redFlagged';
                wasFlag = true;
            }
            let newCallCount = callCount + 1;
            //-----------Update all new data----------
            Vendor.findOneAndUpdate({licenceNumber: card.licenceNumber}, {
                callDate: callDate,
                callerID: callerID,
                flag: flag,
                callCount: newCallCount
            },
            {new: true},
            function(err, user){
                if(err){ return console.log(err)};
                console.log('Zaebumba!');
                res.json({message: 'Zaebumba!'})
            });
        });
    });
    
});     
     
module.exports = hotlineRouter;