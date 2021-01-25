import express from 'express';
import ComplaintController from '../controllers/complaint.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import complaintValidation from '../middlewares/complaint.validation.middleware';

const { savedComplaint, getAllComplaintType } = ComplaintController;
const { validateComplaintObj } = complaintValidation;

const route = express.Router();
route.post('/complaint', [tokenAuthentication, validateComplaintObj], savedComplaint);
route.get('/complaintTypes', getAllComplaintType);
export default route;
