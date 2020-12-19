// Testing using Chai and Mocha

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const User = require('../models/users');
const { dbConnection } = require('../config/db');
const app = require('../app');

const { expect } = chai.use(chaiHttp);

describe(config.GROUP_EDIT_PROFILE_TESTS, () => {
  before(async () => {
    await dbConnection();
  });

  beforeEach(async () => {
    const res1 = await chai.request(app).post('/register').send({
      name: 'Test',
      email: 'test@test.com',
      password: 'Password',
      mobileNo: '7362836745',
      role: 'Driver',
      address: 'test',
    });
  });

  it(config.TEST_FILE_UPLOAD, async () => {
    const res1 = await chai
      .request(app)
      .post('/dashboard/editprofile/upload')
      .field('Content-Type', 'multipart/form-data')
      .attach('file', './public/shahvidhan017@gmail.com.jpeg');
    expect(res1).to.have.status(200);
  });

  after(async () => {
    await User.deleteMany({ email: 'test@test.com' });
  });
});
