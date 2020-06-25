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
} = customMessages;
const {
  created,
  conflict,
  badRequest,
  notFound,
  ok
} = statusCodes;
const {
  user1, user2, loginUser1, invalidLogin, invalidLogin2, invalidLogin3, loginUser4
} = userMock;

describe('User sign up', () => {
  it('Should should create a user', (done) => {
    chai
      .request(server)
      .post('/api/user/auth/signup')
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
  it('Should should not duplicate a user', (done) => {
    chai
      .request(server)
      .post('/api/user/auth/signup')
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
      .post('/api/user/auth/signup')
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
      .post('/api/user/auth/login')
      .send(loginUser1)
      .end((err, res) => {
        const { token, message } = res.body;
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
      .post('/api/user/auth/login')
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
      .post('/api/user/auth/login')
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
      .post('/api/user/auth/login')
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
      .post('/api/user/auth/login')
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
});
