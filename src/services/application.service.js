import models from '../database/models/index';

const {
  JobApplications, Users, Job, Profile
} = models;

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
   * @param {integer} id
   * @param {string} type
   * @returns {array} it returns all applications of a developer
   */
  static async getAllApplicationsByApplicantIdOrJobId(id, type) {
    let applications;
    if (type === 'applicantId') {
      applications = await JobApplications.findAll({
        where: { applicantId: id },
        include: [
          {
            model: Users, as: 'users', include: [{ model: Profile, as: 'profile' }], attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'linkedIn', 'githubUsername', 'status', 'getEmailNotification', 'stackId']
          },
          { model: Job, as: 'job' }
        ]

      });
    }
    applications = await JobApplications.findAll({
      where: { jobId: id },
      include: [
        {
          model: Users, as: 'users', include: [{ model: Profile, as: 'profile' }], attributes: ['firstName', 'lastName', 'email', 'phoneNumber', 'linkedIn', 'githubUsername', 'status', 'getEmailNotification', 'stackId']
        },
        { model: Job, as: 'job' }
      ]
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

  /**
   * @description returns a job application based on jobId and applicantId
   * @param {integer} id
   * @returns {object} it returns the application
   */
  static async getApplicationById(id) {
    const application = await JobApplications.findOne({
      where: { id },
      include: [
        { model: Users, as: 'users', include: [{ model: Profile, as: 'profile' }] },
        { model: Job, as: 'job' }
      ]
    });
    return application;
  }
}
