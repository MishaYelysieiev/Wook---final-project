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
    required: true,
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
    token: String,
    email: String,
    name: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
}
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', User);