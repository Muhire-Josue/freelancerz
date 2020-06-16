import signupValidationSchema from '../validations/signup.validation';
import handleResponse from '../utils/responseHandler.util';
import CustomMessage from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import UserService from '../services/user.service';

const { badRequest, conflict } = statusCode;
const { duplicateUserAccount } = CustomMessage;
const { errorResponse } = handleResponse;
const { getUserByEmail } = UserService;

/** *
 * @description validates the user object for signup endpoint
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object
 */
const validateSignupObj = (req, res, next) => {
  const user = req.body;
  const {
    firstName, lastName, email, password, phoneNumber, userTypeId
  } = user;
  const validateObj = signupValidationSchema.validate({
    firstName, lastName, email, password, phoneNumber, userTypeId
  });

  if (validateObj.error) {
    return errorResponse(res, badRequest, validateObj.error.details[0].message);
  }
  return next();
};
/** *
 * @description validates user account duplication
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object
 */
const userAccountDuplication = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    return errorResponse(res, conflict, duplicateUserAccount);
  }
  return next();
};
export default {
  validateSignupObj,
  userAccountDuplication
};
