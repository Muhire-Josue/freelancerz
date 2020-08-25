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
  jobDetails,
  jobUpdated,
  duplicateStatus,
  unauthorizedAccess,
  jobDeleted,
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
  clientLogin,
  loginUser1,
} = userMock;
const {
  job3,
} = jobMock;
let clientToken;
let developerToken;
let jobId;
let job2Id;

describe('Second Job tests', () => {
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
  it('should create a job', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send(job3)
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

  it('should not create job with an invalid startDate', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send({ ...job3, startDate: '12-7-2019' })
      .set('Authorization', `Bearer ${developerToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(badRequest);
        expect(error);
        expect(error).to.be.a('string');
        done();
      });
  });

  it('should create a job by a developer', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send({ ...job3, description: 'buenos dias amigos' })
      .set('Authorization', `Bearer ${developerToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        job2Id = data.id;
        expect(res.status).to.equal(created);
        expect(message);
        expect(message).to.equal(postJob);
        expect(data);
        expect(data).to.be.an('object');
        done();
      });
  });

  it('should change the job status', (done) => {
    chai
      .request(server)
      .put('/api/job?status=closed')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(jobUpdated);
        expect(message).to.be.a('string');
        done();
      });
  });
  it('should not duplicate job status', (done) => {
    chai
      .request(server)
      .put('/api/job?status=closed')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateStatus);
        expect(error).to.be.a('string');
        done();
      });
  });

  it('Should edit a job', (done) => {
    chai
      .request(server)
      .put('/api/job/edit')
      .send({ ...job3, description: 'This is an updated description', id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(jobUpdated);
        expect(message).to.be.a('string');
        done();
      });
  });
  it('Should edit a job', (done) => {
    chai
      .request(server)
      .put('/api/job/edit')
      .send({ ...job3, description: 'This is an updated description', id: job2Id })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(unAuthorized);
        expect(error);
        expect(error).to.equal(unauthorizedAccess);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('should delete a job', (done) => {
    chai
      .request(server)
      .delete('/api/job')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(jobDeleted);
        expect(message).to.be.a('string');
        done();
      });
  });
});
