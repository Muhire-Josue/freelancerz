import customMessage from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import UserService from '../services/user.service';

const { getUserByEmailOrById } = UserService;
const { errorResponse } = responseHandler;
const { notFound } = statusCode;
const { userISNotFound } = customMessage;

/**
 * @description check if a corresponding id exist in user table
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {object} it returns an error message if user is not found
 */
const checkUserExistById = async (req, res, next) => {
  const { id } = req.params;
  const userId = parseInt(id, 10);
  const user = await getUserByEmailOrById(userId);
  if (!user) {
    return errorResponse(res, notFound, userISNotFound);
  }
  return next();
};
export default checkUserExistById;
