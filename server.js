// get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config()

// Configuring the database

// const config = require('./config/config.js') ||  process.env; // for localhost have to be decomment

const mongoose = require('mongoose');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// parse requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

mongoose.Promise = global.Promise;

//routes file here

require('./src/backend/category/routes')(app);
require('./src/backend/book/routes')(app);
require('./src/backend/user/routes')(app);
require('./src/backend/order/routes')(app);

// connects our back end code with the database
// Connecting to the database
mongoose.connect(process.env.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// launch our backend into a port
app.listen(process.env.PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));