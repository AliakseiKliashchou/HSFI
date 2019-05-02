const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const faoRouter = express.Router();

faoRouter.post('/faoReg', async(req, res, next) => {
    console.log(req);
    res.json({message: 'Server got it!'});
});


module.exports = faoRouter;