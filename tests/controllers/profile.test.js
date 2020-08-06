import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import customMessage from '../../src/utils/customMessage';
import statusCode from '../../src/utils/statusCodes';
import server from '../../index';
import userMock from '../data/user.mock';
import UserService from '../../src/services/user.service';

const { getUserByEmailOrById } = UserService;
chai.use(chaiHttp);
chai.should();

const {
  clientLogin,
  loginUser1,
  user3,
  userProfile,
  invalidLogin,
  invalidLogin2,
  invalidLogin3,
  loginUser4
} = userMock;

const {
  ok,
  created,
  badRequest,
  notFound
} = statusCode;

const {
  successfulLogin,
  profileData,
  userCreated,
  profileUpdated,
  userNotFound,
  incorrectPassword,
  notificationStatusUpdated,
  inactiveAccount,
} = customMessage;

let clientToken;
let developerToken;
let developerId;

describe('Create a user', () => {
  it('Should signup a user', (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user3)
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
});
describe('Profile tests', () => {
  before('get a user', async () => {
    const { dataValues } = await getUserByEmailOrById('user3@example.com');
    developerId = dataValues.id;
  });
  it('Should login a user', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send(clientLogin)
      .end((err, res) => {
        const { token, message } = res.body;
        clientToken = token;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(token);
        expect(message).to.be.a('string');
        expect(message).to.equal(successfulLogin);
        expect(token).to.be.a('string');
        done();
      });
  });
  it('Should should login a developer', (done) => {
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
      .send({ email: 'user3@example.com', password: 'User#example11' })
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
  it('Should get github data', (done) => {
    chai
      .request(server)
      .put('/api/profile')
      .set('Authorization', `Bearer ${developerToken}`)
      .send({ userId: developerId })
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(data);
        expect(message).to.be.a('string');
        expect(message).to.equal(profileData);
        expect(data).to.be.an('object');
        done();
      });
  });
  it('Should update profile', (done) => {
    chai
      .request(server)
      .put('/api/profile/edit')
      .set('Authorization', `Bearer ${developerToken}`)
      .send({ ...userProfile, email: 'job@doe.com' })
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.be.a('string');
        expect(message).to.equal(profileUpdated);
        done();
      });
  });
});
