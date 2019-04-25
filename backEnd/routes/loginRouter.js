const express = require('express');
const loginController = require('../controllers/loginController.js');
const loginRouter = express.Router();
const jsonParser = express.json();

loginRouter.post('/login', loginController.checkLogin);

module.exports = loginRouter;