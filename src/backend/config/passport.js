const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

<<<<<<< HEAD
const User = require('../User/model');
const { jwtSecret } = require('../config/config.js');
=======
// const { jwtSecret } = require('../config/config.js') || process.env.jwtSecret; // for localhost - decooment
const jwtSecret =  process.env.jwtSecret; // for localhost have to be comment
const User = require('../user/model');
>>>>>>> 079b07d1f2a83a4b00f3cea97fcd4b298669a8d1

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};