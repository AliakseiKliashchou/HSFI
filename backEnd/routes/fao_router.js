const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const nodemailer = require('nodemailer');

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

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
          user: 'irongoga130@gmail.com',
          pass: 'Svoboda491956'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      let HelperOptions = {
        from: '"Nephelim" <irongoga130@gmail.com',
        to: 'iron-goga@yandex.ru',
        subject: 'New FAO manager was registered',
        text: 'Hello. New user was registered and waiting for your decision'
      };
      transporter.sendMail(HelperOptions, (err, info) => {
        if(err){console.log(err);}       
      });

    res.json({message: "Vse zaebok!", name: req.body.name});
});     
     
module.exports = faoRouter;