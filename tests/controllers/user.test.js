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
} = customMessages;
const {
  created,
  conflict,
  badRequest,
  notFound,
  ok
} = statusCodes;
const {
  user1, clientSignup, user2, loginUser1, invalidLogin, invalidLogin2, invalidLogin3, loginUser4
} = userMock;
let developerToken;

describe('User test', () => {
  it('Should should create a developer', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user1)
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
  it('Should should create a client', (done) => {
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

  it('Should should login a user', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(loginUser1)
      .end((err, res) => {
        const { token, message } = res.body;
        developerToken = token;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(token);
        expect(message).to.be.a('string');
        expect(message).to.equal(successfulLogin);
        expect(token).to.be.a('string');
        done();
      });
  });
  it('Should should not login when a user is not found in db', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(invalidLogin)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(notFound);
        expect(error);
        expect(error).to.be.a('string');
        expect(error).to.equal(userNotFound);
        done();
      });
  });
  it('Should not login when the password is incorrect', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(invalidLogin2)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.be.a('string');
        expect(error).to.equal(incorrectPassword);
        done();
      });
  });
  it('Should not login with invalid data', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(invalidLogin3)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.be.a('string');
        done();
      });
  });

  it('Should not login when the account is pending', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(loginUser4)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.be.a('string');
        expect(error).to.equal(inactiveAccount);
        done();
      });
  });
  it('Should change the enable or disable email notifications', (done) => {
    chai
      .request(server)
      .put('/api/notification/status/update')
      .set('Authorization', `Bearer ${developerToken}`)
      .send({ status: true })
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(notificationStatusUpdated);
        expect(message).to.be.a('string');
        done();
      });
  });
});
