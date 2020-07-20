import express from 'express';
import UserController from '../controllers/user.controller';
import validations from '../middlewares/authValidations.middleware';
import tokenAuthentication from '../middlewares/tokenAuthentication';

const {
  validateSignupObj,
  userAccountDuplication,
  checkUserExist,
  checkPasswordMatch,
  validateLoginObj,
  isAccountActive
} = validations;
const routes = express.Router();
const { signup, login, enableOrDisableEmailNotification } = UserController;

routes.post('/auth/signup', [validateSignupObj, userAccountDuplication], signup);
routes.post('/auth/login', [validateLoginObj, checkUserExist, checkPasswordMatch, isAccountActive], login);
routes.put('/notification/status/update', tokenAuthentication, enableOrDisableEmailNotification);

export default routes;
