import jobValidationSchema from '../validations/job.validation';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import JobService from '../services/job.service';
import customMessage from '../utils/customMessage';

const { badRequest, notFound } = statusCode;
const { getJobByClientId, getJobById } = JobService;
const { errorResponse } = responseHandler;
const {
  invalidStartDate,
  invalidEndDate,
  invalidJobStatus,
  invalidId,
  jobNotFound,
} = customMessage;

/** *
 * @description validates the job object for createJob endpoint
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object, if formData is invalid
 */
const validateJobObj = (req, res, next) => {
  const {
    title, price, yearsOfExperience, jobType, startDate, endDate, description
  } = req.body;
  const validateObj = jobValidationSchema.validate({
    title, price, yearsOfExperience, jobType, startDate, endDate, description
  });

  if (validateObj.error) {
    return errorResponse(res, badRequest, validateObj.error.details[0].message);
  }
  return next();
};
// const jobDuplication = async (req, res, next) => {
//   const { description } = req.body;
//   const clientId = req.authUser.id;
//   const job = await getJobByClientId(clientId);
//   if (job.dataValues) {
//     const descriptionExist = description.localeCompare(job.dataValues.description);
//     return console.log('descriptionExist', descriptionExist);
//   }
//   return next();
// };

/** *
 * @description validates the startDate property
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object
 */
const startDatesValidation = (req, res, next) => {
  const { startDate } = req.body;
  console.log(new Date().getFullYear() !== new Date(startDate).getFullYear());
  if (new Date().getFullYear() !== new Date(startDate).getFullYear()) {
    return errorResponse(res, badRequest, invalidStartDate);
  }
  if (Date.parse(startDate) < Date.parse(new Date())) {
    return errorResponse(res, badRequest, invalidStartDate);
  }
  console.log(new Date().getFullYear() !== new Date(startDate).getFullYear());
  return next();
};

/**
 * @description this function validates the endDate property
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} it returns an error message if the end date is invalid
 */
const endDateValidation = (req, res, next) => {
  const { endDate, startDate } = req.body;
  if (Date.parse(endDate) < Date.parse(startDate)) {
    return errorResponse(res, badRequest, invalidEndDate);
  }
  return next();
};

/**
 * @description validates job status passed in the URL
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} it returns an error if the status is not provided or it's invalid
 */
const validateJobStatus = (req, res, next) => {
  const { status } = req.query;
  const validStatuses = ['open', 'closed', 'suspended'];
  if (!status) {
    return errorResponse(res, badRequest, invalidJobStatus);
  }
  if (!validStatuses.includes(status)) {
    return errorResponse(res, badRequest, invalidJobStatus);
  }
  return next();
};

/**
 * @description checks if the id is not a number
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} it returns an error message if the id passed in the URL is not a number
 */
const validateId = (req, res, next) => {
  const { id } = req.query;
  if ((Number.isNaN(parseInt(id, 10)))) {
    return errorResponse(res, badRequest, invalidId);
  }
  return next();
};

/**
 * @description check a job of the given id exist
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error message if no job of the given id was found
 */
const jobExist = async (req, res, next) => {
  const { id } = req.query;
  const job = await getJobById(id);
  if (!job) {
    return errorResponse(res, notFound, jobNotFound);
  }
  return next();
};

export default {
  validateJobObj,
  startDatesValidation,
  endDateValidation,
  validateJobStatus,
  validateId,
  jobExist,
  // jobDuplication
};
