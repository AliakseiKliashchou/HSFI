const express = require('express');
const VendorCard = require('../models/vendorCard');


const createVendorCardRouter = express.Router();

createVendorCardRouter.post('/createVendorCard', async(req, res) => { 
    
    VendorCard.create({
        operatorName : req.body.operatorName,
        registrationDate: req.body.registrationDate,
        licenceNumber: req.body.licenceNumber,
        name: req.body.name,
        photo: req.body.photo,
        foodGroup: req.body.foodGroup,    
        serialNumber: req.body.serialNumber,   
        cost: req.body.cost,
        money: req.body.money,           
    });       
   
    res.json({message: "Vendor card was registered"});
});   

module.exports = createVendorCardRouter;