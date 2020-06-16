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
  duplicateUserAccount
} = customMessages;
const {
  created,
  conflict,
  badRequest
} = statusCodes;
const { user1, user2 } = userMock;

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
        expect(token).to.be.an('string');
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
        expect(error).to.be.an('string');
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
        expect(error).to.be.an('string');
        done();
      });
  });
});
