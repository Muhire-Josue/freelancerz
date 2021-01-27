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

  /**
   * @description finds a complaint by id
   * @param {integer} complaintId
   * @returns {object} it returns an object if found
   */
  static async findComplaintById(complaintId) {
    const complaint = await Complaint.findOne({
      where: { id: complaintId }
    });
    return complaint;
  }

  /**
   * @description updates a complaint
   * @param {integer} complaintId
   * @param {object} data
   * @returns {null} it returns nothing
   */
  static async updateComplaint(complaintId, data) {
    await Complaint.update(data, { where: { id: complaintId } });
  }

  /**
   * @description deletes a complaint
   * @param {integer} complaintId
   * @returns {null} it returns nothing
   */
  static async deleteComplaint(complaintId) {
    await Complaint.destroy({ where: { id: complaintId } });
  }
}
