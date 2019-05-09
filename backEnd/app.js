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

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('avatar');
// Check File Type
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
}
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.post('/loadImg', (req, res) => {
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


app.get('/img', (req, res) => {
  res.send('public/uploads/avatar-1557429472104.jpg');
});

//==============================================================================
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
})

app.listen(3000, () => {
  console.log('server started');
})









