import express from 'express';
import JobController from '../controllers/job.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import jobValidations from '../middlewares/jobValidations.middleware';

const { createJob, allOpenJobs, viewJob } = JobController;
const {
  validateJobObj,
  startDatesValidation,
  endDateValidation,
  validateJobStatus,
  validateId,
  jobExist,
} = jobValidations;
const route = express.Router();

route.post('/jobs', [tokenAuthentication, validateJobObj, startDatesValidation, endDateValidation], createJob);
route.get('/jobs', [tokenAuthentication, validateJobStatus], allOpenJobs);
route.get('/job', [tokenAuthentication, validateId, jobExist], viewJob);
export default route;
