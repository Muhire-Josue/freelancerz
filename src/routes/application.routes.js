import express from 'express';
import ApplicationController from '../controllers/application.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import JobValidation from '../middlewares/jobValidations.middleware';
import applicationValidation from '../middlewares/applicationValidation.middleware';

const { validateId, jobExist, jobIsOpen } = JobValidation;
const { applicantIsDeveloper, duplicateJobApplication } = applicationValidation;
const route = express.Router();
const { applyJob } = ApplicationController;

route.post('/job/apply', [
  tokenAuthentication,
  validateId,
  jobExist,
  jobIsOpen,
  applicantIsDeveloper,
  duplicateJobApplication,
], applyJob);

export default route;
