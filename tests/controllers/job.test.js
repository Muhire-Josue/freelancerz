import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userMock from '../data/user.mock';
import customMessages from '../../src/utils/customMessage';
import statusCodes from '../../src/utils/statusCodes';


chai.use(chaiHttp);
chai.should();

const {
  postJob,
  successfulLogin,
  unauthorizedAccess,
  invalidToken,
  invalidEndDate,
  invalidStartDate,
} = customMessages;
const {
  created,
  conflict,
  badRequest,
  notFound,
  unAuthorized,
  ok
} = statusCodes;
const {
  job1,
  clientLogin,
  job2,
} = userMock;
let clientToken;


const { startDate } = job1;
const month = new Date(startDate).getMonth() - 1;
const day = new Date(startDate).getDay();
const year = new Date(startDate).getFullYear();
const prevDate = `${month}-${day}-${year}`;

const prevMonth = new Date().getMonth() - 1;
const someDate = `${prevMonth}-${new Date().getDay()}-${new Date().getFullYear()}`;

describe('Job tests', () => {
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
  it('should create a job', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send(job1)
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        expect(res.status).to.equal(created);
        expect(message);
        expect(message).to.equal(postJob);
        expect(data);
        expect(data).to.be.an('object');
        done();
      });
  });
  it('should not create a job with invalid token', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send(job1)
      .set('Authorization', 'Bearer undefined')
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(unAuthorized);
        expect(error);
        expect(error).to.equal(invalidToken);
        done();
      });
  });
  it('should not create a job without token', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send(job1)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(unAuthorized);
        expect(error);
        expect(error).to.equal(unauthorizedAccess);
        done();
      });
  });
  it('should not create a job with invalid data', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send(job2)
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        done();
      });
  });
  it('should not create a job with previous startDate', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send({ ...job1, startDate: someDate })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal(invalidStartDate);
        done();
      });
  });
  it('should not create a job if the year in startDate is a previous or future year', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send({ ...job1, startDate: '12-9-2019' })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal(invalidStartDate);
        done();
      });
  });
  it('should not create a job if the end year is earlier than start year', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send({ ...job1, endDate: prevDate })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal(invalidEndDate);
        done();
      });
  });
});