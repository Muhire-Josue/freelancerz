import express from 'express';
import UserController from '../controllers/user.controller';
import validations from '../middlewares/authValidations.middleware';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import githubUserDataValidation from '../middlewares/githubData.validation.middleware';

const { githubUserExist } = githubUserDataValidation;
const {
  validateSignupObj,
  userAccountDuplication,
  checkUserExist,
  checkPasswordMatch,
  validateLoginObj,
  isAccountActive
} = validations;
const routes = express.Router();
const {
  signup,
  login,
  enableOrDisableEmailNotification,
  getUser,
  findAllStacks
} = UserController;

routes.post('/auth/signup', [validateSignupObj, userAccountDuplication, githubUserExist], signup);
routes.post('/auth/login', [validateLoginObj, checkUserExist, checkPasswordMatch, isAccountActive], login);
routes.put('/notification/status/update', tokenAuthentication, enableOrDisableEmailNotification);
routes.get('/user', getUser);
routes.get('/stacks', findAllStacks);

export default routes;
