import ApplicationService from '../services/application.service';
import StackService from '../services/stack.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import responseHandler from '../utils/responseHandler.util';

const { saveApplication } = ApplicationService;
const { getStackById } = StackService;

const { ok } = statusCode;
const { appliedSuccessfully } = customMessage;
const { successResponse, updatedResponse } = responseHandler;
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
    const { dataValues } = await saveApplication(application);
    return successResponse(res, ok, appliedSuccessfully, undefined, dataValues);
  }
}
