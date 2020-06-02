import express from 'express';
import UserController from '../controllers/user.controller';
import validations from '../middlewares/validations.middleware';

const {
  validateSignupObj,
  userAccountDuplication
} = validations;
const routes = express.Router();
const { signup } = UserController;

routes.post('/auth/signup', [validateSignupObj, userAccountDuplication], signup);

export default routes;
