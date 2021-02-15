import express from 'express';
import JobController from '../controllers/job.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import jobValidations from '../middlewares/jobValidations.middleware';
import { jobAuthorization } from '../middlewares/authorization.middleware';

const {
  createJob,
  allOpenJobs,
  viewJob,
  updateJobStatus,
  updateJob,
  deleteJob,
} = JobController;
const {
  validateJobObj,
  startDatesValidation,
  endDateValidation,
  validateJobStatus,
  validateId,
  jobExist,
  duplicateJobStatus,
} = jobValidations;
const route = express.Router();

route.post('/jobs', [tokenAuthentication, validateJobObj, startDatesValidation, endDateValidation], createJob);
route.get('/jobs', [validateJobStatus], allOpenJobs);
route.post('/job/view', [tokenAuthentication, validateId, jobExist], viewJob);
route.put('/job', [tokenAuthentication, jobAuthorization, validateJobStatus, duplicateJobStatus, jobExist], updateJobStatus);
route.put('/job/edit', [tokenAuthentication, jobAuthorization, validateJobObj, jobExist], updateJob);
route.delete('/job', [tokenAuthentication, jobAuthorization, jobExist], deleteJob);
export default route;
