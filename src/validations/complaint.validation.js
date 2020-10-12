import Joi from '@hapi/joi';
import createValidationErrors from '../utils/customValidationErrorMsg';
import customMessages from '../utils/customMessage';

const {
  invalidEmailValue,
} = customMessages;

const complaintValidationSchema = Joi.object().keys({
  complainer: Joi.string().email()
    .messages(createValidationErrors('string', invalidEmailValue))
    .required(),
  complainee: Joi.string().email()
    .messages(createValidationErrors('string', invalidEmailValue))
    .required(),
});
export default complaintValidationSchema;
