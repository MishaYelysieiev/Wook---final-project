const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
  const GoogleTokenStrategy = require('passport-google-token').Strategy;
  const FacebookTokenStrategy = require('passport-facebook-token');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

const jwtSecret =  process.env.jwtSecret; 
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

  passport.use(new GoogleTokenStrategy({
    clientID: process.env.REACT_APP_GOOGLEId,
    clientSecret: process.env.GoogleSecret
},
  function (accessToken, refreshToken, profile, done) {
      User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
          return done(err, user);
      });
  }));

  passport.use(new FacebookTokenStrategy({
    clientID: process.env.REACT_APP_FACEBOOK_KEY,
    clientSecret: process.env.FACEBOOK_SECRET,
    passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
    User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
      return done(err, user);
  });
}));
};