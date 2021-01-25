import ComplaintService from '../services/complaint.service';
import responseHandler from '../utils/responseHandler.util';
import customMessage from '../utils/customMessage';
import statusCodes from '../utils/statusCodes';

const { save, findAllComplaintType, findAllComplaint } = ComplaintService;
const { successResponse } = responseHandler;
const { complaintSaved, allComplaintTypes, allComplaint } = customMessage;
const { created, ok } = statusCodes;
/**
 * @description Comment controller
 */
export default class ComplaintController {
  /**
    * @description create a complaint
    * @param {Request} req
    * @param {Response} res
    * @returns {object} it a saved object
    */
  static async savedComplaint(req, res) {
    const formData = req.body;
    const complaint = await save(formData);
    return successResponse(res, created, complaintSaved, undefined, complaint);
  }

  /**
    * @description get all complaint types
    * @param {Request} req
    * @param {Response} res
    * @returns {object} it returns all complaint types
    */
  static async getAllComplaintType(req, res) {
    const complaintTypes = await findAllComplaintType();
    return successResponse(res, ok, allComplaintTypes, undefined, complaintTypes);
  }

  /**
    * @description get all complaint
    * @param {Request} req
    * @param {Response} res
    * @returns {object} it returns all complaint
    */
  static async getAllComplaint(req, res) {
    if (req.query.complaintTypeId) {
      const { complaintTypeId } = req.query;

      const complaints = await findAllComplaint(complaintTypeId);
      return successResponse(res, ok, allComplaint, undefined, complaints);
    }

    const complaints = await findAllComplaint();
    return successResponse(res, ok, allComplaint, undefined, complaints);
  }
}
