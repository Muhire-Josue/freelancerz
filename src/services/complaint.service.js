import models from '../database/models/index';

const { Complaint, ComplaintType } = models;
/**
 * @description Complaint service
 */
export default class ComplaintService {
  /**
   * @description saves a complaint
   * @param {complaint} complaint
   * @returns {object} it returns a saved complaint
   */
  static async save(complaint) {
    const savedComplaint = await Complaint.create(complaint);
    return savedComplaint;
  }

  /**
   * @description get all complaint types
   * @returns {object} it returns an array of complaint type
   */
  static async findAllComplaintType() {
    const complaintTypes = await ComplaintType.findAll();
    return complaintTypes;
  }
}
