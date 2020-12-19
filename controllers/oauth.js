const passport = require('passport');

exports.login = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.callback = passport.authenticate('google');
