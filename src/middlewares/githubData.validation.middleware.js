import HandleProfile from '../utils/HandleProfile';
import responseHandler from '../utils/responseHandler.util';
import customMessage from '../utils/customMessage';
import statusCode from '../utils/statusCodes';

const { errorResponse } = responseHandler;
const { notFound } = statusCode;
const { githubUserNotFound } = customMessage;
const { githubUserData } = HandleProfile;
const githubUserExist = async (req, res, next) => {
  const { githubUsername, userTypeId } = req.body;
  if (userTypeId === 1 && githubUsername) {
    const data = await githubUserData(githubUsername);
    if (!data) {
      return errorResponse(res, notFound, githubUserNotFound);
    }
    req.githubData = data;
    return next();
  }
  return next();
};
export default {
  githubUserExist,
};
