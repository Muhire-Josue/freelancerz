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
  appliedSuccessfully,
  notDeveloper,
  jobUpdated,
  jobNotOpened,
  duplicateApplication,
  applicationApproved,
  applicationNotFound,
  allApplications,
  applicationFound,
  notificationStatusUpdated,
} = customMessages;
const {
  created,
  conflict,
  badRequest,
  notFound,
  unAuthorized,
  ok,
  forbidden
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
let jobId2;
const developerId = 1;
const clientId = 2;

describe('Application tests', () => {
  it('Should should login a client', (done) => {
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
      .send({ ...job3, tag: '1,2,3', })
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

  it('should apply to a job', (done) => {
    chai
      .request(server)
      .post('/api/job/apply')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${developerToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(appliedSuccessfully);
        expect(data);
        expect(data).to.be.an('object');
        done();
      });
  });
  it('should not apply twice', (done) => {
    chai
      .request(server)
      .post('/api/job/apply')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${developerToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(conflict);
        expect(error);
        expect(error).to.equal(duplicateApplication);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('should not apply to a job if the user is not a developer', (done) => {
    chai
      .request(server)
      .post('/api/job/apply')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(forbidden);
        expect(error);
        expect(error).to.equal(notDeveloper);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('should create a second job', (done) => {
    chai
      .request(server)
      .post('/api/jobs')
      .send({ ...job3, description: 'This is clearly another job post' })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        jobId2 = data.id;
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
      .send({ id: jobId2 })
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
  it('should not apply to a job if the status is not opened', (done) => {
    chai
      .request(server)
      .post('/api/job/apply')
      .send({ id: jobId2 })
      .set('Authorization', `Bearer ${developerToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(forbidden);
        expect(error);
        expect(error).to.equal(jobNotOpened);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('should approve an application', (done) => {
    chai
      .request(server)
      .put('/api/job/apply/approve')
      .send({ id: jobId, applicantId: developerId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(applicationApproved);
        expect(message).to.be.a('string');
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
  it('should approve an application', (done) => {
    chai
      .request(server)
      .put('/api/job/apply/approve')
      .send({ id: jobId, applicantId: developerId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(applicationApproved);
        expect(message).to.be.a('string');
        done();
      });
  });
  it('should not approve if the application does not exist', (done) => {
    chai
      .request(server)
      .put('/api/job/apply/approve')
      .send({ id: 0, applicantId: clientId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(notFound);
        expect(error);
        expect(error).to.equal(applicationNotFound);
        expect(error).to.be.a('string');
        done();
      });
  });
  it('should view all applications for a job', (done) => {
    chai
      .request(server)
      .post('/api/job/applications')
      .send({ id: jobId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        jobId2 = data.id;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(allApplications);
        expect(data);
        expect(data).to.be.an('array');
        done();
      });
  });
  it('should view an application for a job', (done) => {
    chai
      .request(server)
      .post('/api/job/application')
      .send({ id: jobId, applicantId: developerId })
      .set('Authorization', `Bearer ${clientToken}`)
      .end((err, res) => {
        const { data, message } = res.body;
        jobId2 = data.id;
        expect(res.status).to.equal(ok);
        expect(message);
        expect(message).to.equal(applicationFound);
        expect(data);
        expect(data).to.be.an('object');
        done();
      });
  });
});
