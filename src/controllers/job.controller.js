import JobService from '../services/job.service';
import customMessages from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';

const { saveJob, getAllJobsByStatus } = JobService;
const { postJob, allJobs } = customMessages;
const { created, ok } = statusCode;
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

  /**
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns all open/available jobs
   */
  static async allOpenJobs(req, res) {
    const { status } = req.query;
    const jobs = await getAllJobsByStatus(status);
    return successResponse(res, ok, allJobs, undefined, jobs);
  }
}
