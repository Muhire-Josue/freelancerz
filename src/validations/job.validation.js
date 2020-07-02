import Joi from '@hapi/joi';
import createValidationErrors from '../utils/customValidationErrorMsg';
import customMessages from '../utils/customMessage';

const {
  invalidTitle,
  invalidPrice,
  invalidYearsOfExperience,
  invalidStartDate,
  invalidEndDate,
  invalidJobType,
  invalidJobDescription,
} = customMessages;

const jobValidationSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30)
    .messages(createValidationErrors('string', invalidTitle))
    .required(),
  price: Joi.number().strict(true).required()
    .messages(createValidationErrors('string', invalidPrice))
    .required(),
  yearsOfExperience: Joi.string()
    .messages(createValidationErrors('string', invalidYearsOfExperience)),
  jobType: Joi.string().valid('full-time', 'part-time').required()
    .messages(createValidationErrors('string', invalidJobType))
    .required(),
  startDate: Joi.string()
    .messages(createValidationErrors('string', invalidStartDate))
    .required(),
  endDate: Joi.string()
    .messages(createValidationErrors('string', invalidEndDate))
    .required(),
  description: Joi.string().required()
    .messages(createValidationErrors('string', invalidJobDescription)),
});
export default jobValidationSchema;
