const express = require('express');
const VendorCard = require('../models/vendorCard');


const createVendorCardRouter = express.Router();

createVendorCardRouter.post('/createVendorCard', async(req, res) => {      
    console.log(req.body);
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
       
    console.log('check2');
    res.json({message: "Vse zaebok! Card zaregana)"});
});   

module.exports = createVendorCardRouter;