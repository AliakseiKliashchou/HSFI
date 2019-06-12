const express = require('express');
const user = require('../models/user');
const nodemailer = require('nodemailer');

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
      subject: 'New operator was registered',
      text: 'Hello. New user was registered and waiting for your decision'
    };
    transporter.sendMail(HelperOptions, (err, info) => {
      if(err){console.log(err);}      
    });

    res.json({message: "Ok", name: req.body.name});
});     
     
module.exports = operatorRouter;