import express from 'express';
import ComplaintController from '../controllers/complaint.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import complaintValidation from '../middlewares/complaint.validation.middleware';
import { checkAdmin } from '../middlewares/authorization.middleware';

const { savedComplaint, getAllComplaintType, getAllComplaint } = ComplaintController;
const { validateComplaintObj } = complaintValidation;

const route = express.Router();
route.post('/complaint', [tokenAuthentication, validateComplaintObj], savedComplaint);
route.get('/complaintTypes', getAllComplaintType);
route.get('/complaints', [tokenAuthentication, checkAdmin], getAllComplaint);
export default route;
