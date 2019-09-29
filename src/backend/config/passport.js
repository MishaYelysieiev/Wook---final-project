const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

const jwtSecret =  process.env.jwtSecret; // for localhost have to be comment
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

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLEId,
        clientSecret: process.env.GoogleSecret,
        callbackURL: "https://wookstore.herokuapp.com/api/authentication/google/redirect"
      },
      function (accessToken, profile, done) {
        process.nextTick(function () {
            User.findOne({
                $or: [
                    { 'google.id': profile.id },
                    { 'email': profile.emails[0].value }
                ]
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    if (user.google.id == undefined) {
                        user.google.id = profile.id;
                        user.google.token = accessToken;
                        user.google.email = profile.emails[0].value;
                        user.google.name = profile.name.givenName + ' ' + profile.name.familyName;
                        user.save();
                    }

                    return done(null, user);

                } else {
                    let newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.email = profile.emails[0].value;
                    newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.firstName = profile.name.givenName
                    newUser.lastName = profile.name.familyName;
                    newUser.email = profile.emails[0].value;

                    newUser.save(err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    })
  );
};