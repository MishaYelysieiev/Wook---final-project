// get dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configuring the database
const config = require('./config/config.js') ||  process.env;
const mongoose = require('mongoose');

// parse requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.Promise = global.Promise;

//routes file here
require('./category/routes')(app);
require('./book/routes')(app);
require('./cart/routes')(app);
require('./user/routes')(app);

// connects our back end code with the database
// Connecting to the database
mongoose.connect(config.url || process.env.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// launch our backend into a port
app.listen(config.serverport || process.env.SERVERPORT, () => console.log(`LISTENING ON PORT ${config.serverport || process.env.SERVERPORT}`));