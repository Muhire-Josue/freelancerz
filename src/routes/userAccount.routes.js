import express from 'express';
import UserController from '../controllers/user.controller';
import validations from '../middlewares/authValidations.middleware';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import githubUserDataValidation from '../middlewares/githubData.validation.middleware';
import { checkAdmin } from '../middlewares/authorization.middleware';
import checkUserExistById from '../middlewares/checkUserExist.middleware';

const { githubUserExist } = githubUserDataValidation;
const {
  validateSignupObj,
  userAccountDuplication,
  checkUserExist,
  checkPasswordMatch,
  validateLoginObj,
  isAccountActive,
} = validations;
const route = express.Router();
const {
  signup,
  login,
  enableOrDisableEmailNotification,
  getUser,
  getUsers,
  findAllStacks,
  activateDeveloperAccount,
  declineDeveloperAccount
} = UserController;

route.post('/auth/signup', [validateSignupObj, userAccountDuplication, githubUserExist], signup);
route.post('/auth/login', [validateLoginObj, checkUserExist, checkPasswordMatch, isAccountActive], login);
route.put('/notification/status/update', tokenAuthentication, enableOrDisableEmailNotification);
route.put('/user/activate/:id', [tokenAuthentication, checkAdmin, checkUserExistById], activateDeveloperAccount);
route.put('/user/decline/:id', [tokenAuthentication, checkAdmin, checkUserExistById], declineDeveloperAccount);
route.get('/user', tokenAuthentication, getUser);
route.get('/users', tokenAuthentication, getUsers);
route.get('/stacks', findAllStacks);

export default route;
