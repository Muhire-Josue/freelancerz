import JobService from '../services/job.service';
import customMessages from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';

const { saveJob } = JobService;
const { postJob } = customMessages;
const { created } = statusCode;
const { successResponse } = responseHandler;

/**
 * @description this controller works with everything regarding jobs
 */
export default class JobController {
  /**
     *
     * @param {request} req
     * @param {response} res
     * @returns {object} it returns the newly created job
     */
  static async createJob(req, res) {
    const newJob = req.body;
    newJob.status = 'open';
    newJob.clientId = req.authUser.id;
    const { dataValues } = await saveJob(newJob);
    const job = dataValues;
    return successResponse(res, created, postJob, undefined, job);
  }
}
