import express from 'express';
import ApplicationController from '../controllers/application.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import JobValidation from '../middlewares/jobValidations.middleware';
import applicationValidation from '../middlewares/applicationValidation.middleware';

const { validateId, jobExist, jobIsOpen } = JobValidation;
const {
  applicantIsDeveloper,
  duplicateJobApplication,
  applicationExist,
  isApplicantEligible
} = applicationValidation;
const route = express.Router();
const {
  applyJob,
  approveJobApplication,
  allJobApplications,
  jobApplication
} = ApplicationController;

route.post('/job/apply', [
  tokenAuthentication,
  validateId,
  jobExist,
  jobIsOpen,
  applicantIsDeveloper,
  duplicateJobApplication,
  isApplicantEligible,
], applyJob);
route.put('/job/apply/approve', [tokenAuthentication, validateId, applicationExist], approveJobApplication);
route.post('/job/applications', [tokenAuthentication, validateId, jobExist], allJobApplications);
route.post('/job/application', [tokenAuthentication, validateId, applicationExist], jobApplication);
export default route;
