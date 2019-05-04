const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const operatorRouter = express.Router();

operatorRouter.post('/operatorReg', async(req, res, next) => {    
    
    user.create({
      role: req.body.role,
      country: req.body.country,
      name: req.body.name,
      organization: req.body.organization,
      email: req.body.email,
      password: req.body.password,
      task: req.body.task,

    });

    res.json({message: "Vse zaebok!", name: req.body.name});
});     
     
module.exports = operatorRouter;