const mongoose = require('mongoose');

const User = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  role: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  dp: {
    type: String,
  },
});

module.exports = mongoose.model('User', User);
