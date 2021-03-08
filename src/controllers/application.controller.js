import ApplicationService from '../services/application.service';
import UserService from '../services/user.service';
import JobService from '../services/job.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import responseHandler from '../utils/responseHandler.util';
import emailMessages from '../utils/emailMessages';
import getRecommendations from '../utils/getRecommendations';
import getStack from '../utils/getStack';
import sendEmail from '../utils/sendEmail';

const {
  saveApplication,
  updateApplicationStatus,
  getAllApplications,
  getAllApplicationsByApplicantIdOrJobId,
  getApplicationById,
} = ApplicationService;
const { getUserByEmailOrById } = UserService;
const { getJobByStatusOrById } = JobService;
const { generateStacksForJobApplication } = getStack;

const { approvedApplicationEmail } = sendEmail;

const { ok } = statusCode;
const {
  appliedSuccessfully,
  applicationApproved,
  allApplications,
  applicationFound,
} = customMessage;
const { successResponse, updatedResponse } = responseHandler;

const { applicationJobApproved, approvedApplicationSubject } = emailMessages;
const {
  getRecommendationForAllApplicants,
  getApplicationWithRecommendation,
} = getRecommendations;

/**
 * @description this controller deals with job applications
 */
export default class ApplicationController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns the a success message
   */
  static async applyJob(req, res) {
    const application = {};
    const { id } = req.body;
    const userId = req.authUser.id;
    application.jobId = parseInt(id, 10);
    application.applicantId = parseInt(userId, 10);
    application.status = 'pending';
    const { dataValues } = await saveApplication(application);
    const jobApplication = await getApplicationById(dataValues.id);
    if (jobApplication.dataValues.job.dataValues.stackId) {
      // eslint-disable-next-line max-len
      const jobApplicationWithStacks = await generateStacksForJobApplication(jobApplication.dataValues);
      return successResponse(res, ok, appliedSuccessfully, undefined, jobApplicationWithStacks);
    }
    return successResponse(res, ok, appliedSuccessfully, undefined, jobApplication);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a success message upon successful application approval
   */
  static async approveJobApplication(req, res) {
    const { id } = req.body;
    const applicationId = parseInt(id, 10);
    const newStatus = 'approved';
    await updateApplicationStatus(applicationId, newStatus);
    const application = await getApplicationById(applicationId);
    const userId = parseInt(application.dataValues.applicantId, 10);
    const { dataValues } = await getUserByEmailOrById(userId);
    const { email, firstName, getEmailNotification } = dataValues;
    if (getEmailNotification) {
    // eslint-disable-next-line max-len
      approvedApplicationEmail(email, firstName, '#', applicationJobApproved, approvedApplicationSubject);
    }
    return updatedResponse(res, ok, applicationApproved);
  }

  /** jobId
   * @param {Request} req
   * @param {Response} res
   * @returns {array} it returns all applications for a specific job
   */
  static async allJobApplications(req, res) {
    const { id } = req.body;
    const jobId = parseInt(id, 10);
    const applications = await getAllApplicationsByApplicantIdOrJobId(jobId, 'jobId');
    const job = await getJobByStatusOrById(jobId);
    if (job.dataValues.stackId) {
      const applicationsWithRecommendation = getRecommendationForAllApplicants(applications);
      return successResponse(res, ok, allApplications, undefined, applicationsWithRecommendation);
    }
    return successResponse(res, ok, allApplications, undefined, applications);
  }

  
   /** jobId
   * @param {Request} req
   * @param {Response} res
   * @returns {array} it returns all applications for a specific job
   */
    static async viewAllApplications(req, res) {
      
      const applications = await getAllApplications();
      
      return successResponse(res, ok, allApplications, undefined, applications);
    }

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {array} it returns all applications for a specific job
   */
  static async jobApplication(req, res) {
    const { id } = req.body;
    const application = await getApplicationById(id);
    const jobId = parseInt(application.dataValues.jobId, 10);
    const job = await getJobByStatusOrById(jobId);
    if (job.dataValues.stackId) {
      const applicationsWithRecommendation = getApplicationWithRecommendation(application);
      return successResponse(res, ok, applicationFound, undefined, applicationsWithRecommendation);
    }
    return successResponse(res, ok, applicationFound, undefined, application);
  }
}
