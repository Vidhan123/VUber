const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      try {
        User.findOne({ email: email }, async (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (!user.password) {
            return done(null, false);
          }
          await bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (!isMatch) {
              return done(null, false);
            }
            return done(null, user);
          });
          return true;
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    try {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
