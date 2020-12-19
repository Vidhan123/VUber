// Testing using Chai and Mocha

const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./config');
const User = require('../models/users');
const { dbConnection } = require('../config/db');
const app = require('../app');

const { expect } = chai.use(chaiHttp);

let token;
describe(config.GROUP_USER_TESTS, () => {
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
    const res2 = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'Password' });
    token = res2.body.token;
  });

  it(config.TEST_UNAUTHENTICATED_REQ, async () => {
    const res1 = await chai.request(app).get('/dashboard').send({});
    expect(res1).to.have.status(401);
    expect(res1.body.msg).to.be.a('string').eql('Not Authenticated');
  });

  it(config.TEST_PUBLIC_PROFILE, async () => {
    const res1 = await chai
      .request(app)
      .get('/allReqs')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res1).to.have.status(200);
  });
  after(async () => {
    await User.deleteMany({ email: 'test@test.com' });
  });
});
