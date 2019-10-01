// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model');

require('dotenv').config()


// const { jwtSecret } = require('../config/config.js') || process.env.jwtSecret; // for localhost - decooment

 const jwtSecret =  process.env.jwtSecret; // for localhost have to be comment

// Load validators
const registerValidation = require('../validation/registr');
const loginValidation = require('../validation/login');

// @endpoint   POST /api/users/register
// @desc       Register users
// @access     public
exports.register = async (req, res) => {

  const {
    errors,
    isValid
  } = registerValidation(req.body);
  // check for not valid
  if (isValid > 0)
    return res.status(400).json(errors);

  try {
    // Validate if the user already exist
    const user = await User.findOne({
      email: req.body.email
    });
    if (user) {
      errors.email = 'User already exist!';
      return res.status(400).json(errors);
    }
    // Grab user information
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    } = req.body;
    const userInfo = {
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    };
    // Crypt the password
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(password, salt);
    // Create the user
    const newUser = await User.create(userInfo);
    //errors = {};

    // Generate token
    const {
      id,
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail
    } = newUser;
    // In jwt.sign set the data that you want to get
    const token = await jwt.sign({
      id,
      userFirstName,
      userLastName,
      userEmail
    }, jwtSecret, {
      expiresIn: 3600
    });
    const bearerToken = `Bearer ${token}`;
    res.json({
      token: bearerToken
    });

    // res.status(200).send(newUser);
  } catch (err) {
    console.log (err)
    res.status(400).send(err);
  }
};

// @endpoint   POST /api/users/login
// @desc       Login the user
// @access     public
exports.login = async (req, res) => {

  const {
    errors,
    isValid
  } = loginValidation(req.body);

  // check for not valid
  if (isValid > 0) {
    console.log('login', isValid, errors);
    return res.status(400).json(errors);
  }

  try {
    const {
      email,
      password
    } = req.body;
    // Find the user
    const user = await User.findOne({
      email
    });
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
    const {
      id,
      firstName,
      lastName,
      email: userEmail
    } = user;
    // In jwt.sign set the data that you want to get
    const token = await jwt.sign({
      id,
      firstName,
      lastName,
      userEmail
    }, jwtSecret, {
      expiresIn: 3600
    });
    const bearerToken = `Bearer ${token}`;
    res.json({
      token: bearerToken
    });

  } catch (err) {
    console.log (err)
    res.status(400).send(err);
  }

};


// @endpoint   GET /api/users/current
// @desc       Return current user
// @access     private
exports.current = (req, res) => {
  res.send(req.user);
}


// Update 
exports.update = async (req, res) => {
  // Validate Request

  const {
    errors,
    isValid
  } = registerValidation(req.body);
  // check for not valid
  if (isValid > 0)
    return res.status(400).json(errors);

  try {
    // Grab user information
    let {
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    } = req.body;


    // Find the user
    const user = await User.findOne({
      email
    });
    if (!user) {
      errors.email = 'User not found!'
      return res.status(404).json(errors);
    }
    // check if password changed
    const samePassword = await password === user.password;
    // userInfo
    const salt = await bcrypt.genSalt(10);
    if (!samePassword){
      password = await bcrypt.hash(password, salt);
    } else {
      password = await user.password
    }
    // Update the user
    const newUser = await User.findByIdAndUpdate(req.user._id, {
      firstName,
      lastName,
      email,
      password,
      phone,
      address
    }, {
      new: true
    });

    // Generate token
     const {
      id,
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail
    } = await newUser;
    // In jwt.sign set the data that you want to get
    const token = await jwt.sign({
      id,
      userFirstName,
      userLastName,
      userEmail
    }, jwtSecret, {
      expiresIn: 3600
    });
    const bearerToken = `Bearer ${token}`;
    res.json({
      token: bearerToken
    });
  
  } catch (err) {
    console.log (err)
    res.status(400).send(err);
  }

};

  exports.generateUserToken = async (req, res) => {
    try {
      if (!req.user) {
          return res.send(401, 'User Not Authenticated');
      }
       
      // Find the user
      const newUser = await req.user;
  
      // Generate token
       const {
        id,
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail
      } = await newUser;
      // In jwt.sign set the data that you want to get
      const token = await jwt.sign({
        id,
        userFirstName,
        userLastName,
        userEmail
      }, jwtSecret, {
        expiresIn: 3600
      });
      const bearerToken = `Bearer ${token}`;
      res.json({
        token: bearerToken
      });
    
    } catch (err) {
      console.log (err)
      res.status(400).send(err);
    }
  
  };