import Joi from '@hapi/joi';
import createValidationErrors from '../utils/customValidationErrorMsg';
import customMessages from '../utils/customMessage';

const {
  invalidFirstNameValue,
  invalidLastNameValue,
  invalidEmailValue,
  invalidPhoneNumberValue,
  invalidPasswordValue,
  invalidUserType
} = customMessages;

const signupValidationSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(30)
    .messages(createValidationErrors('string', invalidFirstNameValue))
    .required(),
  lastName: Joi.string().alphanum().min(3).max(30)
    .messages(createValidationErrors('string', invalidLastNameValue))
    .required(),
  email: Joi.string().email()
    .messages(createValidationErrors('string', invalidEmailValue))
    .required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])[0-9a-zA-Z!@#$%^&*?]{8,}$/)
    .messages(createValidationErrors('string', invalidPasswordValue))
    .required(),
  phoneNumber: Joi.string().length(10).alphanum()
    .messages(createValidationErrors('string', invalidPhoneNumberValue))
    .required(),
  userTypeId: Joi.number().strict(true)
    .valid(1, 2)
    .messages(createValidationErrors('string', invalidUserType))
    .required()
});
export default signupValidationSchema;
