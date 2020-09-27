import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userMock from '../data/user.mock';
import customMessages from '../../src/utils/customMessage';
import statusCodes from '../../src/utils/statusCodes';

chai.use(chaiHttp);
chai.should();

const {
  userCreated,
  duplicateUserAccount,
  successfulLogin,
  userNotFound,
  incorrectPassword,
  inactiveAccount,
  notificationStatusUpdated,
  userData,
  allStacks,
} = customMessages;
const {
  created,
  conflict,
  badRequest,
  notFound,
  ok
} = statusCodes;
const {
  user1,
  clientSignup,
  user2,
  loginUser1,
  invalidLogin,
  invalidLogin2,
  invalidLogin3,
  loginUser4,
  user3,
} = userMock;
let developerToken;

describe('User test', () => {
  it('Should create a developer', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user1)
      .end((err, res) => {
        const { token, message } = res.body;
        developerToken = token;
        expect(res.status).to.equal(created);
        expect(message);
        expect(message).to.equal(userCreated);
        expect(token);
        expect(token).to.be.a('string');
        done();
      });
  });
  it('Should create a client', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(clientSignup)
      .end((err, res) => {
        const { token, message } = res.body;
        expect(res.status).to.equal(created);
        expect(message);
        expect(message).to.equal(userCreated);
        expect(token);
        expect(token).to.be.a('string');
        done();
      });
  });
  it('Should should not duplicate a user', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user1)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateUserAccount);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('Should should not create user with invalid data', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user2)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('Should get the user data from the token', (done) => {
    chai
      .request(server)
      .get('/api/user?id=1')
      .set('Authorization', `Bearer ${developerToken}`)
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(data);
        expect(message).to.be.a('string');
        expect(message).to.equal(userData);
        expect(data).to.be.an('object');
        done();
      });
  });
  it('Should get all stack', (done) => {
    chai
      .request(server)
      .get('/api/stacks')
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(data);
        expect(message).to.be.a('string');
        expect(message).to.equal(allStacks);
        expect(data).to.be.an('array');
        done();
      });
  });
});
