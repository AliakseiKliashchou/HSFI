const express       = require("express");
const mongoose      = require("mongoose");
const cors          = require('cors');
const config        = require('./config/app_config.js');
const app           = express();
const session       = require('express-session');
const FileStore     = require('session-file-store')(session);
const passport      = require('passport');

require('./config/server_config.js')(app);
require('./models');
require('./routes/product_router.js')(app);

app.use(cors());

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
    .then(() => app.listen(
        config.appPort,
        () => console.log(`Listening on port ${config.appPort}...`)
    ))
    .catch((err) => console.error(`Error connection to mongo DB: ${config.mongoUrl}`, err) );










