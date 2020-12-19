const express = require('express');
const http = require('http');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const upload = require('./config/upload');

const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

require('./config/localConfig')(passport);
require('./config/oauthConfig')(passport);

const { hostname, port } = require('./constants/constants');
const { dbConnection } = require('./config/db');

dbConnection();

// --- App config
const app = express();

// body-parser
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// File upload
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  multer({
    storage: upload.storage,
    fileFilter: upload.fileFilter,
  }).single('file')
);

app.use(passport.initialize());
app.use(passport.session());

// --- Routes
app.use(userRouter);
app.use(profileRouter);
app.use(requestRouter);

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = app;
