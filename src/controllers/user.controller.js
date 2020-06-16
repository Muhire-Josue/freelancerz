import bcrypt from 'bcrypt';
import handleResponse from '../utils/responseHandler.util';
import UserService from '../services/user.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import tokenGenerator from '../utils/jwtTokenGenerator';

const { createUser } = UserService;
const { created } = statusCode;
const { userCreated } = customMessage;
const { successResponse } = handleResponse;
/**
 * @description this class deals with the user model
 */
export default class UserController {
  /**
     *
     * @param {request} req
     * @param {response} res
     * @returns {object} the token of a registered user or error messages
     */
  static async signup(req, res) {
    const formData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const plainTextPassword = formData.password;
    formData.password = bcrypt.hashSync(plainTextPassword, salt);
    const token = tokenGenerator(formData);
    const createdUser = await createUser(formData);
    return successResponse(res, created, userCreated, token, createdUser);
  }
}
