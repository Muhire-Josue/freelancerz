import { async } from 'regenerator-runtime';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import JobService from '../services/job.service';
import customMessage from '../utils/customMessage';

const { unAuthorized } = statusCode;
const { errorResponse } = responseHandler;
const { getJobByStatusOrById } = JobService;
const { unauthorizedAccess } = customMessage;

/** *
 * @description checks if the job belongs to the current user
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object, if the job does not belong to the user
 */

const authorization = async (req, res, next) => {
  const { id } = req.query;
  const jobId = parseInt(id, 10);
  const currentUser = req.authUser;
  const { dataValues } = await getJobByStatusOrById(jobId);
  if (dataValues.clientId !== currentUser.id) {
    return errorResponse(res, unAuthorized, unauthorizedAccess);
  }
  return next();
};

export default authorization;
