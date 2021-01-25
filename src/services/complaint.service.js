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

  /**
   * @description get all complaint
   * @param {integer} complaintTypeId
   * @returns {object} it returns an array of complaints
   */
  static async findAllComplaint(complaintTypeId) {
    let complaints;
    if (complaintTypeId) {
      complaints = await Complaint.findAll({
        where: { complaint_typeId: complaintTypeId },
        include: [{ model: ComplaintType, as: 'complaint' }]

      });
    } else {
      complaints = await Complaint.findAll({
        include: [{ model: ComplaintType, as: 'complaint' }]
      });
    }
    return complaints;
  }
}
