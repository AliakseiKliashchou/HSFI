const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const http = require('http');
//const MongoClient = require('mongodb').MongoClient;
//const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const express = require('express');
const passport = require('passport');
const app = express();
const UserModel = require('./models/user');
const jsonParser = express.json();


mongoose.connect('mongodb://127.0.0.1:27017/HSFI', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;
//Cors--------------------------------------------------
const cors = require('cors');
app.use(cors());
//****************************************************

require('./controllers/auth');

app.use(urlencodedParser);
app.use(bodyParser.json());

const routes = require('./routes/user_router');
const secureRoute = require('./routes/user_secure_router');

app.use('/', routes); 

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

//**********FAO REGISTRATION***************** */

const faoRouter = require('./routes/fao_router');
app.post('/faoReg', faoRouter);


//******************************************* */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
})

app.listen(3000, () => {
  console.log('server started');
})









