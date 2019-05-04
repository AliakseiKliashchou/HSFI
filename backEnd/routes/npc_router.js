const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const npcRouter = express.Router();

npcRouter.post('/npcReg', async(req, res, next) => {    
    
    user.create({
        country: req.body.country,
        name: req.body.name,
        organization: req.body.organization,
        mailing: req.body.mailing,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });

    res.json({message: "Vse zaebok!", name: req.body.name});
});     
     
module.exports = npcRouter;