// Testing using Chai and Mocha

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const User = require('../models/users');
const { dbConnection } = require('../config/db');
const app = require('../app');

const { expect } = chai.use(chaiHttp);

describe(config.GROUP_PRE_LOGIN_TESTS, () => {
  before(async () => {
    await dbConnection();
  });

  it(config.TEST_DUPLICATE_USER, async () => {
    const user1 = await chai.request(app).post('/register').send({
      name: 'Test',
      email: 'test@test.com',
      password: 'Password',
      mobileNo: '7362836745',
      role: 'Driver',
      address: 'test',
    });
    const user2 = await chai.request(app).post('/register').send({
      name: 'Test2',
      email: 'test@test.com',
      password: 'Password2',
      mobileNo: '8362836745',
      role: 'Driver',
      address: 'test2',
    });
    expect(user2.body.msg)
      .to.be.a('string')
      .eql('This email is already registered');
  });

  it(config.TEST_VALID_USER, async () => {
    const user3 = await chai.request(app).post('/register').send({
      name: 'Test',
      email: 'test3@test.com',
      password: 'Password3',
      mobileNo: '9362836745',
      role: 'Driver',
      address: 'test3',
    });
    expect(user3.body.msg).to.be.a('string').eql('Registered Successfully');
  });

  it(config.TEST_VALID_LOGIN, async () => {
    const res1 = await chai.request(app).post('/login').send({
      email: 'test3@test.com',
      password: 'Password3',
    });
    expect(res1.body.msg).to.be.a('string').eql('Logged In');
  });

  it(config.TEST_INVALID_LOGIN, async () => {
    const res1 = await chai.request(app).post('/login').send({
      email: 'test3@test.com',
      password: 'IncorrectPassword',
    });
    expect(res1.body.msg).to.be.a('string').eql('Invalid Credentials');
  });

  after(async () => {
    await User.deleteMany({ role: 'Driver' });
  });
});
