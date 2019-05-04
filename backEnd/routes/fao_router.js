const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const faoRouter = express.Router();

faoRouter.post('/faoReg', async(req, res, next) => {    
    
    user.create({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
        office: req.body.office,
        phone: req.body.phone

    });

    res.json({message: "Vse zaebok!", name: req.body.name});
});     
     
module.exports = faoRouter;