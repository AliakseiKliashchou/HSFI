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
const ejs = require('ejs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
// Public Folder
app.use(express.static('./public/uploads'));


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

//*************PROFILE********************* */
const viewProfileRouter = require('./routes/view_profile_router');
app.post('/viewProfile', viewProfileRouter);
const changeProfileRouter = require('./routes/change_profile_router');
app.post('/changeProfile', changeProfileRouter);
//********************************************* */

//***********NPC REGISTRATION***************** */
const npcRouter = require('./routes/npc_router');
app.post('/npcReg', npcRouter);
//******************************************* */

//***********OPERATOR REGISTRATION********** */
const operatorRouter = require('./routes/operator_router');
app.post('/operatorReg', operatorRouter);
//******************************************* */

//***********GET OPERATOR INFORMATION********** */
const getOperatorRouter = require('./routes/get_operator_router');
app.post('/getOperator', getOperatorRouter);
//******************************************* */

//***********GET VENDOR INFORMATION********** */
const getVendorRouter = require('./routes/get_vendor_router');
app.post('/getVendor', getVendorRouter);
//******************************************* */

//***********GET VENDOR CARD********** */
const getVendorCardRouter = require('./routes/get_vendorCard_router');
app.post('/getVendorCard', getVendorCardRouter);
//******************************************* */
//***********CREATE NEW VENDOR CARD********** */
const createVendorCardRouter = require('./routes/create_vendorCard_router');
app.post('/createVendorCard', createVendorCardRouter);
//******************************************* */

//***********UPLOAD VENDOR IMAGES********* */
const uploadVendorPhotoRouter = require('./routes/upload_vendor_photo_router');
app.post('/uploadVendorPhoto', uploadVendorPhotoRouter);

const uploadVendorLicenceRouter = require('./routes/upload_vendor_licence_router');
app.post('/uploadVendorLicence', uploadVendorLicenceRouter);
//******************************************* */

//***********VENDOR REGISTRATION********** */
const vendorRegistrationRouter = require('./routes/vendor_registration_router');
app.post('/vendorRegistration', vendorRegistrationRouter);
//******************************************* */

//***********VENDOR REGISTRATION********** */
const hotlineRouter = require('./routes/hotline_router');
app.post('/hotline', hotlineRouter);
//******************************************* */

//***********VIEW VENDOR********** */
const viewVendorRouter = require('./routes/view_vendor_router');
app.post('/viewVendor', viewVendorRouter);
//******************************************* */




//==============================================================================
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
})

app.listen(3000, () => {
  console.log('server started');
})









