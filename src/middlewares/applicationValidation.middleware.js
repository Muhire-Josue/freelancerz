import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import customMessage from '../utils/customMessage';
import generateJobIdFromArray from '../utils/generateJobId';
import ApplicationService from '../services/application.service';

const {
  badRequest,
  conflict,
  forbidden,
  notFound
} = statusCode;
const { errorResponse } = responseHandler;
const { notDeveloper, duplicateApplication, applicationNotFound } = customMessage;
const { getAllApplicationsByApplicantIdOrJobId } = ApplicationService;

/**
 * @description check if applicant is a developer
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} error message if the applicant is not a developer
 */
const applicantIsDeveloper = (req, res, next) => {
  const { userTypeId } = req.authUser;
  if (userTypeId !== 1) {
    return errorResponse(res, forbidden, notDeveloper);
  }
  return next();
};

/**
 * @description check duplicate application
  * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} it returns an error message if the job application is a duplication
 */
const duplicateJobApplication = async (req, res, next) => {
  const { id } = req.body;
  const developerId = req.authUser.id;
  const jobs = await getAllApplicationsByApplicantIdOrJobId(developerId, 'applicantId');
  const jobIds = generateJobIdFromArray(jobs);
  if (jobIds.includes(id)) {
    return errorResponse(res, conflict, duplicateApplication);
  }
  return next();
};

/**
 * @description check if application exist
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} if the user did not apply to that job then it returns error message
 */
const applicationExist = async (req, res, next) => {
  const { applicantId, id } = req.body;
  const userId = parseInt(applicantId, 10);
  const jobId = parseInt(id, 10);
  const applications = await getAllApplicationsByApplicantIdOrJobId(userId, 'applicantId');
  const jobIds = generateJobIdFromArray(applications);
  if (!jobIds.includes(jobId)) {
    return errorResponse(res, notFound, applicationNotFound);
  }
  return next();
};

export default {
  applicantIsDeveloper,
  duplicateJobApplication,
  applicationExist,
};
