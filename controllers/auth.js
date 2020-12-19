const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/users');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.json({ msg: err });
    }
    if (!user) {
      return res.json({ msg: 'Invalid Credentials' });
    }
    req.logIn(user, (error) => {
      if (error) {
        return res.json({ msg: error });
      }
      return next();
    });
    return next();
  })(req, res, next);
};

exports.register = (req, res) => {
  const { email, mobileNo, role, address, password } = req.body;
  const name = `${req.body.firstName} ${req.body.lastName}`;
  try {
    User.findOne({ email: email }, async (err, user) => {
      if (err) throw err;
      if (user) res.json({ msg: 'This email is already registered' });
      if (!user) {
        const newUser = new User({
          name,
          email,
          mobileNo,
          role,
          address,
          password,
        });

        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.json({ msg: 'Registered Successfully' });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  if (!req.isAuthenticated()) {
    res.status(401).json({ msg: 'Not Authenticated' });
  }
  return false;
};
