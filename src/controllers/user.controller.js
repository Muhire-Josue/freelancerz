import bcrypt from 'bcrypt';
import handleResponse from '../utils/responseHandler.util';
import UserService from '../services/user.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import tokenGenerator from '../utils/jwtTokenGenerator';

const { createUser, getUserByEmail } = UserService;
const { created, ok } = statusCode;
const { userCreated, successfulLogin } = customMessage;
const { successResponse } = handleResponse;
/**
 * @description this class deals with the user model
 */
export default class UserController {
  /**
     *
     * @param {request} req
     * @param {response} res
     * @returns {object} the token of a created user or error messages
     */
  static async signup(req, res) {
    const formData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const plainTextPassword = formData.password;
    formData.password = bcrypt.hashSync(plainTextPassword, salt);
    formData.status = 'pending';
    await createUser(formData);
    const token = tokenGenerator(formData);
    return successResponse(res, created, userCreated, token);
  }

  /**
   *
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns the token of the logged in user
   */
  static async login(req, res) {
    const { email } = req.body;
    const { dataValues } = await getUserByEmail(email);
    const token = tokenGenerator(dataValues);
    return successResponse(res, ok, successfulLogin, token);
  }
}
