import bcrypt from 'bcrypt';
import { async } from 'regenerator-runtime';
import signupValidationSchema from '../validations/signup.validation';
import loginValidationSchema from '../validations/login.validation';
import handleResponse from '../utils/responseHandler.util';
import CustomMessage from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import UserService from '../services/user.service';

const { badRequest, conflict, notFound } = statusCode;
const {
  duplicateUserAccount, userNotFound, incorrectPassword, inactiveAccount
} = CustomMessage;
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
  const {
    firstName, lastName, email, password, phoneNumber, userTypeId
  } = req.body;
  const validateObj = signupValidationSchema.validate({
    firstName, lastName, email, password, phoneNumber, userTypeId
  });

  if (validateObj.error) {
    return errorResponse(res, badRequest, validateObj.error.details[0].message);
  }
  return next();
};

/**
 *@description validates the input for login
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object for invalid data format
 */
const validateLoginObj = (req, res, next) => {
  const { email, password } = req.body;
  const validateObj = loginValidationSchema.validate({ email, password });
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

/** *
 * @description checks if user exist
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object if user is non-existing
 */
const checkUserExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user === null) {
    return errorResponse(res, notFound, userNotFound);
  }
  return next();
};

/** *
 * @description checks if password is matches with what's in db
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object if password doesn't match
 */
const checkPasswordMatch = async (req, res, next) => {
  const { email, password } = req.body;
  const { dataValues } = await getUserByEmail(email);
  const HashedPassword = dataValues.password;
  const passwordMatch = bcrypt.compareSync(password, HashedPassword);
  if (!passwordMatch) {
    return errorResponse(res, badRequest, incorrectPassword);
  }
  return next();
};

/**
 * @description checkes whether the account is active
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} if the account is not activated it returns an error message
 */
const isAccountActive = async (req, res, next) => {
  const { email } = req.body;
  const { dataValues } = await getUserByEmail(email);
  if (dataValues.status === 'pending') {
    return errorResponse(res, badRequest, inactiveAccount);
  }
  return next();
};
export default {
  validateSignupObj,
  userAccountDuplication,
  checkUserExist,
  checkPasswordMatch,
  validateLoginObj,
  isAccountActive
};
