const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session: false }), async(req, res, next) => {
  res.json({
    message: 'Signup successful'
  });
});

router.post('/login', async(req, res, next) => {
  console.log(req.body);
  passport.authenticate('login', async(err, user, info) => {
    try { 
      if(err || !user) {
        const error = new Error('An Error occured');
        //console.log('fuck you'); это если неправильные логин или пароль
        return res.json({message: 'User not found or wrong login or password!'});
      }
      
      req.login(user, { session: false }, async(error) => {
        if(error) { return next(error) }

        const body = {_id: user._id, email: user.email};
        const token = jwt.sign({ user: body }, 'top_secret');      
        console.log(token);
        User.findOneAndUpdate({email: req.body.email}, {
          token: token,
        }, {new: true}, (err, doc) => {
          if(err){console.log(err);}
          console.log(doc);
        });
       
      return  res.json({ token, isFind: true, user });
     
      }); 
    } catch(error) {      
      return next(error);
  }
  })(req, res, next);
  
});

/*router.post('/login', async(req, res, next) => {
  passport.authenticate('login', async(err, user, info) => {
    try { 
      console.log('err', err);
      console.log('user', user);
      if(err || !user) {
        return res.json({ 'isFind': false });
      }
      
      req.login(user, { session: false }, async(error) => {
        if(error) { return next(error) }

        const body = {_id: user._id, email: user.email};
        const token = jwt.sign({ user: body }, 'top_secret');
        return res.json({ 'isFind': true, token });
      }); 
    } catch(error) {
      return next(error);
    }
  })(req, res, next);
});*/

module.exports = router;