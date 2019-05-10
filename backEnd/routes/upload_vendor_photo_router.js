const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const path = require('path');
const multer = require('multer');

const uploadVendorPhotoRouter = express.Router();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,req.query.logoName +'-photo'+ path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('avatar');  

  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  };  

  uploadVendorPhotoRouter.post('/uploadVendorPhoto', (req, res) => {
    var logoName = req.query.logoName;
    console.log(logoName);
    upload(req, res, (err) => {
      if(err){
        res.json( { msg: err });
      } else {
        if(req.file == undefined){
          res.json( {   msg: 'Error: No File Selected!' });
        } else {
          res.json( { msg: 'File Uploaded!', file: `uploads/${req.file.filename}`});
        }
      }
    });
  });

module.exports = uploadVendorPhotoRouter;