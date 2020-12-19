const express = require('express');
const profile = require('../controllers/update');

const profileRouter = express.Router();

profileRouter.post('/dashboard/editprofile/upload', profile.editProfile);

module.exports = profileRouter;
