const mongoose = require('mongoose');
const { Schema } = mongoose;


const User = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 1024
  },
  address: {
    country: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1024
    },
    city:{
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1024
    },
    street:{
      type: String,
      required: false,
      minlength: 5,
      maxlength: 1024
    }
  },
  phone: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 1024
  },
  facebook: {
    id: String,
    token: String
  },
  google: {
    id: String,
    token: String
}
}, { timestamps: true });

User.set('toJSON', {getters: true, virtuals: true});

User.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  let that = this;
  return this.findOne({
      $or: [
        { 'google.id': profile.id },
        { 'email': profile.emails[0].value }
    ]      
  }, function(err, user) {

    if (user) {
      if (user.google.id == undefined) {
          user.google.id = profile.id;
          user.google.token = accessToken;
          user.email = profile.emails[0].value;
          user.firstName = profile.name.givenName
          user.lastName = profile.name.familyName;
          user.save();
      }

      return cb(null, user);

      // no user was found, lets create a new one
    } else {
        let newUser = new that({       
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            google: {
                id: profile.id,
                token: accessToken
            }
        });
        newUser.save(function(error, savedUser) {
            if (error) {
                console.log(error);
            }
            return cb(error, savedUser);
        });
      }
  });
};

User.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  let that = this;
  return this.findOne({
      $or: [
        {'facebook.id': profile.id},
        { 'email': profile.emails[0].value }
    ]      
  }, function(err, user) {

    if (user) {
      if (user.facebook.id == undefined) {
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.email = profile.emails[0].value;
          user.firstName = profile.name.givenName
          user.lastName = profile.name.familyName;
          user.save();
      }

      return cb(null, user);

      // no user was found, lets create a new one
    } else {
        let newUser = new that({       
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            facebook: {
                id: profile.id,
                token: accessToken
            }
        });
        newUser.save(function(error, savedUser) {
            if (error) {
                console.log(error);
            }
            return cb(error, savedUser);
        });
      }
  });
};


module.exports = mongoose.models.User || mongoose.model('User', User);