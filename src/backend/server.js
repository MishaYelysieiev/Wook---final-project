const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Category = require('./models/category');

const API_PORT = 3000;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute= require('./config');

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Category CRUD
router.post('/category/', function(req, res) {
    let category = new Category({
        name: req.body.name,
    });

    category.save(function (err) {
        if (!err) {
            return res.send({ status: 'OK', category:category });
        } else {
            console.log(err);
            if(err.name === 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

router.get('/category/:id', function(req, res) {
    return Category.findById(req.params.id, function (err, category) {
        if(!category) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', category:category });
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.put('/category/:id', function (req, res){
    return Category.findById(req.params.id, function (err, category) {
        if(!category) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        category.name = req.body.name;
        return category.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', category:category });
            } else {
                if(err.name === 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    });
});

router.delete('/category/:id', function (req, res){
    return Category.findById(req.params.id, function (err, category) {
        if(!category) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return category.remove(function (err) {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});




// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));