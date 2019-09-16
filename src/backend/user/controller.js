// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model');
const { jwtSecret } = require('../config/config.js');
// Load validators
const registerValidation = require('../validation/registr');
const loginValidation = require('../validation/login');

// @endpoint   POST /api/users/register
// @desc       Register users
// @access     public
exports.register = async (req, res) => {

  const { errors, isValid } = registerValidation(req.body);
  // check for not valid
  if (isValid > 0) 
    return res.status(400).json(errors);
  
  try {
    // Validate if the user already exist
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = 'User already exist!';
      return res.status(400).json(errors);
    }  
    // Grab user information
    const { name, email, password, phone, address } = req.body;
    const userInfo = { name, email, password, phone, address };
    // Crypt the password
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(password, salt);
    // Create the user
    const newUser = await User.create(userInfo);
    //errors = {};

     // Generate token
  const { id, name: userName, email: userEmail } = newUser;
  // In jwt.sign set the data that you want to get
  const token = await jwt.sign({ id, userName, userEmail }, jwtSecret, { expiresIn: 3600 });
  const bearerToken = `Bearer ${token}`; 
  res.json({ token: bearerToken });

    // res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @endpoint   POST /api/users/login
// @desc       Login the user
// @access     public
exports.login = async (req, res) => {

  const { errors, isValid } = loginValidation(req.body);

  // check for not valid
  if (isValid > 0) {
    console.log('login', isValid, errors);
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found!'
    return res.status(404).json(errors);
  }

  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
  
  // Generate token
  const { id, name, email: userEmail } = user;
  // In jwt.sign set the data that you want to get
  const token = await jwt.sign({ id, name, userEmail }, jwtSecret, { expiresIn: 3600 });
  const bearerToken = `Bearer ${token}`; 
  res.json({ token: bearerToken });

};


// @endpoint   GET /api/users/current
// @desc       Return current user
// @access     private
exports.current = (req, res) => {
  res.send(req.user);
}
