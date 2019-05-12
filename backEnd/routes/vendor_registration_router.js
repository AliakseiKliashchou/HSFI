const express = require('express');
const Vendor = require('../models/vendor');
const fs = require('fs');

const vendorRegistrationRouter = express.Router();

vendorRegistrationRouter.post('/vendorRegistration', (req, res) => {    
   var img = {
    photoName: '-', 
    licenceName: '-'
   }
    fs.rename(`public/uploads/${req.body.flag}-photo.jpg`, `public/uploads/${req.body.email}-photo.jpg`, (err) => {
        if(err){
            console.log(err);
        } else{
            img.photoName = `http://localhost:3000/${req.body.email}-photo.jpg`;
            fs.rename(`public/uploads/${req.body.flag}-licence.jpg`, `public/uploads/${req.body.email}-licence.jpg`, (err) => {
                if(err){
                    console.log(err);
                } else{
                    img.licenceName = `http://localhost:3000/${req.body.email}-licence.jpg`;
                    Vendor.create({
                        operatorName: req.body.operatorName,
                        registrationDate: req.body.registrationDate,
                        photo: img.photoName, 
                        licenceScan: img.licenceName,
                        country: req.body.country, 
                        phone: req.body.phone,
                        email: req.body.email,
                        businessLocation: req.body.businessLocation,
                        businessSchedule: req.body.businessSchedule,
                        ingredientSource: req.body.ingredientSource,
                        foodGroup: req.body.foodGroup,
                    });
                }
            });
            
        }
    });    
//operator@operator.ru-photo
//operator@operator.ru-photo     
    res.json({message: "Vse zaebok! Vendor zaregan)"});
});  

module.exports = vendorRegistrationRouter;