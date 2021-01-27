import express from 'express';
import ComplaintController from '../controllers/complaint.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import complaintValidation from '../middlewares/complaint.validation.middleware';
import { checkAdmin } from '../middlewares/authorization.middleware';

const {
  savedComplaint,
  getAllComplaintType,
  getAllComplaint,
  getComplaint,
  editComplaint,
  deleteAComplaint,
} = ComplaintController;
const { validateComplaintObj } = complaintValidation;

const route = express.Router();
route.post('/complaint', [tokenAuthentication, validateComplaintObj], savedComplaint);
route.put('/complaint/:id', [tokenAuthentication, validateComplaintObj], editComplaint);
route.delete('/complaint/:id', [tokenAuthentication, checkAdmin], deleteAComplaint);
route.get('/complaintTypes', getAllComplaintType);
route.get('/complaints', [tokenAuthentication, checkAdmin], getAllComplaint);
route.get('/complaint/:id', [tokenAuthentication, checkAdmin], getComplaint);

export default route;
