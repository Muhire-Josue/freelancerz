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
  user3
} = userMock;

const {
  ok,
  created
} = statusCode;

const {
  successfulLogin,
  profileData,
  userCreated,
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
});
