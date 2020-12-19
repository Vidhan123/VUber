const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const { secretKey } = require('../constants/constants');
const User = require('../models/users');

exports.getToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: 3600 });
};

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      User.findOne({ email: jwtPayload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    } catch (err) {
      console.log(err);
    }
  })
);

exports.verifyUser = passport.authenticate('jwt', { session: false });
