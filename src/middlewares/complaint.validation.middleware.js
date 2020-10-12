import complaintValidation from '../validations/complaint.validation';
import responseHandler from '../utils/responseHandler.util';
import statusCode from '../utils/statusCodes';

const { badRequest } = statusCode;
const { errorResponse } = responseHandler;
const validateComplaintObj = (req, res, next) => {
  const { complainer, complainee } = req.body;
  const validateObj = complaintValidation.validate({ complainer, complainee });

  if (validateObj.error) {
    return errorResponse(res, badRequest, validateObj.error.details[0].message);
  }
  return next();
};

export default {
  validateComplaintObj,
};
