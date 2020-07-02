import models from '../database/models/index';

const { Job, Users } = models;

/**
 * @description this service deals with the Job model
 */
export default class JobService {
  /**
     * @description save new job in db
     * @param {object} job
     * @returns {object} it returns the saved job obj
     */
  static async saveJob(job) {
    const createdJob = Job.create(job);
    return createdJob;
  }

  /**
 * @description finds a job of a particular client
 * @param {integer} clientId
 * @returns {object} it returns the job found
 */
  static async getJobByClientId(clientId) {
    const job = await Job.findAll({ where: { clientId } });
    return job;
  }

  /**
 * @description finds all jobs with particular status
 * @param {integer} status
 * @returns {object} it returns the job based on a particular status
 */
  static async getAllJobsByStatus(status) {
    const jobs = await Job.findAll({
      where: { status },
      include: [{ model: Users, as: 'jobOwner' }]
    });
    return jobs;
  }

  /**
   * @description finds a job based on the job id
   * @param {string} id
   * @returns {object} it returns the job found
   */
  static async getJobById(id) {
    const job = await Job.findOne({
      where: { id },
      include: [{ model: Users, as: 'jobOwner' }]
    });
    return job;
  }
}
