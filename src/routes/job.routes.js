import express from 'express';
import JobController from '../controllers/job.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import jobValidations from '../middlewares/jobValidations.middleware';

const { createJob, allOpenJobs } = JobController;
const {
  validateJobObj,
  startDatesValidation,
  endDateValidation,
  validateJobStatus
} = jobValidations;
const route = express.Router();

route.post('/jobs', [tokenAuthentication, validateJobObj, startDatesValidation, endDateValidation], createJob);
route.get('/jobs', [tokenAuthentication, validateJobStatus], allOpenJobs);
export default route;
