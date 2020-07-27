import githubUserData from '../utils/githubUserData';
import responseHandler from '../utils/responseHandler.util';
import customMessage from '../utils/customMessage';
import statusCode from '../utils/statusCodes';

const { errorResponse } = responseHandler;
const { notFound } = statusCode;
const { githubUserNotFound } = customMessage;
const githubUser = async (req, res, next) => {
  const { username } = req.body;
  const data = await githubUserData(username);
  if (!data) {
    return errorResponse(res, notFound, githubUserNotFound);
  }
};
export default {
  githubUser,
};
