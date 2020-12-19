const path = require('path');
const dotEnv = require('dotenv');

const parsedEnv = dotEnv.config({
  path: path.join(__dirname, '../.env'),
});

if (parsedEnv.error) throw parsedEnv.error;

const hostname = process.env.HOST || 'localhost';

const port = Number(process.env.PORT) || 9000;

const DBUrl = process.env.DB_CONNECTION_URL;

const secretKey = process.env.SECRET;

module.exports = {
  hostname,
  port,
  DBUrl,
  secretKey,
};
