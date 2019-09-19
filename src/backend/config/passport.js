const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

const { jwtSecret } = require('../config/config.js') || process.env.jwtSecret; // for localhost - decooment
// const jwtSecret =  process.env.jwtSecret; // for localhost have to be comment
const User = require('../user/model');

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