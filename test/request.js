// Testing using Chai and Mocha

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const User = require('../models/users');
const Requests = require('../models/requests');
const { dbConnection } = require('../config/db');
const app = require('../app');

const { expect } = chai.use(chaiHttp);

describe(config.GROUP_REQUEST_TESTS, () => {
  before(async () => {
    await dbConnection();
  });

  beforeEach(async () => {
    const customer = await chai.request(app).post('/register').send({
      name: 'Test1',
      email: 'test1@test.com',
      password: 'Password1',
      mobileNo: '7362836745',
      role: 'Customer',
      address: 'test',
    });
    const driver = await chai.request(app).post('/register').send({
      name: 'Test2',
      email: 'test2@test.com',
      password: 'Password2',
      mobileNo: '8362836745',
      role: 'Driver',
      address: 'test',
    });
  });

  it(config.TEST_CREATE_REQUEST, async () => {
    const userId = await User.findOne({ email: 'test1@test.com' });
    const res1 = await chai.request(app).post('/request').send({
      pU: 'TestpU',
      d: 'Testd',
      userId: userId,
      time: 'Testt',
    });
    expect(res1).to.have.status(200);
  });

  it(config.TEST_EDIT_REQUEST, async () => {
    const userId = await User.findOne({ email: 'test1@test.com' });
    const res1 = await chai.request(app).put('/request').send({
      pU: 'TestpU',
      d: 'Testd',
      createdBy: userId,
      time: 'Testt',
    });
    expect(res1).to.have.status(200);
  });

  it(config.TEST_DELETE_REQUEST, async () => {
    const userId = await User.findOne({ email: 'test1@test.com' });
    const res1 = await chai.request(app).delete('/request').send({
      createdBy: userId,
    });
    expect(res1).to.have.status(200);
  });

  it(config.TEST_ALL_REQUESTS, async () => {
    const res1 = await chai.request(app).get('/allReqs').send({});
    expect(res1).to.have.status(200);
  });

  it(config.TEST_ACCEPT_REQUEST, async () => {
    const createdBy = await User.findOne({ email: 'test1@test.com' });
    const userId = await User.findOne({ email: 'test2@test.com' });
    const res1 = await chai.request(app).post('/request').send({
      pU: 'TestpU',
      d: 'Testd',
      userId: userId,
      time: 'Testt',
    });
    const res2 = await chai.request(app).post('/acceptReq').send({
      acceptedBy: userId,
      createdBy: createdBy,
    });
    expect(res2).to.have.status(200);
  });

  after(async () => {
    await User.deleteMany({ address: 'test' });
    await Requests.deleteMany({ time: 'Testt' })
  });
});
