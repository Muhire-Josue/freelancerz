import models from '../database/models/index';

const { JobApplications } = models;

/**
 * This service deals with job applications
 */
export default class JobService {
  /**
   * @description save job application
   * @param {object} application
   * @returns {object} returns the application details
   */
  static async saveApplication(application) {
    const applicationInfo = await JobApplications.create(application);
    return applicationInfo;
  }

  /**
   * @description get all applications of a developer
   * @param {object} applicantId
   * @returns {array} it returns all applications of a developer
   */
  static async getAllApplicationsByApplicantId(applicantId) {
    const applications = await JobApplications.findAll({
      where: { applicantId }
    });
    return applications;
  }

  /**
   * @description update the status of a job application
   * @param {integer} jobId
   * @param {integer} applicantId
   * @param {string} newStatus
   * @returns {null} nothing
   */
  static async updateApplicationStatus(jobId, applicantId, newStatus) {
    const application = await JobApplications.update(
      { status: newStatus },
      { where: { jobId, applicantId } }
    );
    return application;
  }
}
