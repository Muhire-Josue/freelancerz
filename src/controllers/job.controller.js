import JobService from '../services/job.service';
import StackService from '../services/stack.service';
import customMessages from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';

const {
  saveJob,
  getJobByStatusOrById,
  updateJob: update,
  deleteJobByJobId
} = JobService;
const { saveStack } = StackService;
const {
  postJob,
  allJobs,
  jobDetails,
  jobUpdated,
  jobDeleted,
} = customMessages;
const { created, ok } = statusCode;
const { successResponse, updatedResponse } = responseHandler;

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
    const stack = {};
    let newStack;
    newJob.status = 'opened';
    newJob.clientId = req.authUser.id;
    stack.tech = newJob.tag;
    newStack = await saveStack(stack);
    newStack = newStack.dataValues;
    newJob.stackId = newStack.id;
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
    const jobs = await getJobByStatusOrById(status);
    return successResponse(res, ok, allJobs, undefined, jobs);
  }

  /**
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a job
   */
  static async viewJob(req, res) {
    const { id } = req.body;
    const jobId = parseInt(id, 10);
    const job = await getJobByStatusOrById(jobId);
    return successResponse(res, ok, jobDetails, undefined, job.dataValues);
  }

  /**
   * @description change the status of a job (open, closed, suspended)
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a message saying the job status has been updated
   */
  static async updateJobStatus(req, res) {
    const { status } = req.query;
    const { id } = req.body;
    const jobId = parseInt(id, 10);
    await update(jobId, status);
    return updatedResponse(res, ok, jobUpdated);
  }

  /**
   * @description update a job
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a message saying the job has been updated
   */
  static async updateJob(req, res) {
    const job = req.body;
    const { id } = req.body;
    const jobId = parseInt(id, 10);
    await update(jobId, job);
    return updatedResponse(res, ok, jobUpdated);
  }

  /**
   * @description update a job
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a message saying the job has been updated
   */
  static async deleteJob(req, res) {
    const { id } = req.body;
    const jobId = parseInt(id, 10);
    await deleteJobByJobId(jobId);
    return updatedResponse(res, ok, jobDeleted);
  }
}
