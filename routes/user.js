const express = require('express');

const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const jwtauth = require('../controllers/jwtauth');

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/', (req, res) => {
  res.send('Home Page');
});

userRouter
  .route('/login')
  .get((req, res) => {
    res.send('Login Page');
  })
  .post(auth.login, jwtauth.login);

userRouter
  .route('/register')
  .get((req, res) => {
    res.send('Sign Up Page');
  })
  .post(auth.register);

userRouter.get('/dashboard', auth.ensureAuthenticated, (req, res) => {
  res.send('Dashboard');
});

// oauth routes
userRouter.get('/auth/google', oauth.login);
userRouter.get('/auth/google/callback', oauth.callback, jwtauth.ologin);

module.exports = userRouter;
