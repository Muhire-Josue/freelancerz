import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userMock from '../data/user.mock';
import jobMock from '../data/job.mock';
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
  allJobs,
  invalidJobStatus,
  jobDetails,
  invalidId,
  jobNotFound,
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
  clientLogin,
} = userMock;
const {
  job1,
  job2,
} = jobMock;
let clientToken;
let jobId;


const { startDate } = job1;
const month = new Date(startDate).getMonth() - 1;
const day = new Date(startDate).getDay();
const year = new Date(startDate).getFullYear();
const prevDate = `${month}-${day + 1}-${year}`;

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
        jobId = data.id;
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

  it('should get all open jobs', (done) => {
    chai
      .request(server)
      .get('/api/jobs?status=opened')
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(allJobs);
        expect(data);
        expect(data).to.be.an('array');
        done();
      });
  });
  it('should not get all open jobs if status is not provided', (done) => {
    chai
      .request(server)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal(invalidJobStatus);
        done();
      });
  });
  it('should not get all open jobs if status is invalid', (done) => {
    chai
      .request(server)
      .get('/api/jobs?status=invalid')
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal(invalidJobStatus);
        done();
      });
  });

  it('should get the details of a specific job', (done) => {
    chai
      .request(server)
      .post('/api/job/view')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(jobDetails);
        expect(data);
        expect(data).to.be.an('object');
        done();
      });
  });

  it('should not get the details of a specific job with invalid id', (done) => {
    chai
      .request(server)
      .post('/api/job/view')
      .send({ id: 'invalid' })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.equal(invalidId);
        done();
      });
  });
  it('should not get the details of a specific if job is not found', (done) => {
    chai
      .request(server)
      .post('/api/job/view')
      .send({ id: 0 })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(notFound);
        expect(error);
        expect(error).to.equal(jobNotFound);
        done();
      });
  });
});
