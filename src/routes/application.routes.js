import express from 'express';
import ApplicationController from '../controllers/application.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import JobValidation from '../middlewares/jobValidations.middleware';
import applicationValidation from '../middlewares/applicationValidation.middleware';
import authorization from '../middlewares/authorization.middleware';

const { validateId, jobExist, jobIsOpen } = JobValidation;
const { applicantIsDeveloper, duplicateJobApplication, applicationExist } = applicationValidation;
const route = express.Router();
const { applyJob, approveJobApplication } = ApplicationController;

route.post('/job/apply', [
  tokenAuthentication,
  validateId,
  jobExist,
  jobIsOpen,
  applicantIsDeveloper,
  duplicateJobApplication,
], applyJob);
route.put('/job/apply/approve', [tokenAuthentication, authorization, validateId, applicationExist], approveJobApplication);

export default route;
