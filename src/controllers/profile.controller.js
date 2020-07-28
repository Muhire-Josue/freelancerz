import customMessage from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import ProfileService from '../services/profile.service';


const { successResponse, updatedResponse } = responseHandler;
const { profileData } = customMessage;
const { ok } = statusCode;
const { getProfileByUserId } = ProfileService;

/**
 * @description this controller deals with user profile
 */
export default class ProfileController {
  /**
     * @description get a profile
     * @param {request} req
     * @param {response} res
     * @returns {object} it returns a profile
     */
  static async userProfile(req, res) {
    const { userId } = req.body;
    const id = parseInt(userId, 10);
    const profile = await getProfileByUserId(id);
    return successResponse(res, ok, profileData, undefined, profile);
  }
}
