import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import customMessage from '../utils/customMessage';
import generateJobIdFromArray from '../utils/generateJobId';
import ApplicationService from '../services/application.service';

const { badRequest, conflict, forbidden } = statusCode;
const { errorResponse } = responseHandler;
const { notDeveloper, duplicateApplication } = customMessage;
const { getAllApplicationsByApplicantId } = ApplicationService;

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
  const jobs = await getAllApplicationsByApplicantId(developerId);
  const jobIds = generateJobIdFromArray(jobs);
  if (jobIds.includes(id)) {
    return errorResponse(res, conflict, duplicateApplication);
  }
  return next();
};

export default {
  applicantIsDeveloper,
  duplicateJobApplication,
};
