import models from '../database/models/index';

const { Job } = models;

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
}
