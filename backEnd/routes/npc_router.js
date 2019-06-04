const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const nodemailer = require('nodemailer');

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
        subject: 'New NPC was registered',
        text: 'Hello. New user was registered and waiting for your decision'
      };
      transporter.sendMail(HelperOptions, (err, info) => {
        if(err){console.log(err);}        
      });

    res.json({message: "Vse zaebok!", name: req.body.name});
});     
     
module.exports = npcRouter;