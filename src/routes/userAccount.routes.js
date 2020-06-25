import express from 'express';
import UserController from '../controllers/user.controller';
import validations from '../middlewares/authValidations.middleware';

const {
  validateSignupObj,
  userAccountDuplication,
  checkUserExist,
  checkPasswordMatch,
  validateLoginObj,
  isAccountActive
} = validations;
const routes = express.Router();
const { signup, login } = UserController;

routes.post('/auth/signup', [validateSignupObj, userAccountDuplication], signup);
routes.post('/auth/login', [validateLoginObj, checkUserExist, checkPasswordMatch, isAccountActive], login);

export default routes;
