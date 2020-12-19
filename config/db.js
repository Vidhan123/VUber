const mongoose = require('mongoose');
const { DBUrl } = require('../constants/constants');

module.exports = {
  dbConnection: async () => {
    try {
      await mongoose.connect(DBUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database Connected');
    } catch (error) {
      console.log('Database not connected');
    }
  },
};
