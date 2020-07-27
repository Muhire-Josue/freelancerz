import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import customMessage from '../../src/utils/customMessage';
import statusCode from '../../src/utils/statusCodes';
import server from '../../index';
import userMock from '../data/user.mock';


chai.use(chaiHttp);
chai.should();

const {
  clientLogin,
  loginUser1,
} = userMock;

const {
  ok,
} = statusCode;

const {
  successfulLogin,
  gitHubUserFound,
} = customMessage;

let clientToken;
let developerToken;
describe('Profile tests', () => {
  it('Should should login a user', (done) => {
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
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${developerToken}`)
      .send({ username: 'Muhire-Josue' })
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(data);
        expect(message).to.be.a('string');
        expect(message).to.equal(gitHubUserFound);
        expect(data).to.be.an('object');
        done();
      });
  });
});
