import models from '../database/models/index';

const { Job, Users, Stack } = models;

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
 * @param {integer} data
 * @returns {object} it returns the job based on a particular data
 */
  static async getJobByStatusOrById(data) {
    if (['opened', 'closed', 'suspended'].includes(data)) {
      const jobs = await Job.findAll({
        where: { status: data },
        include: [{ model: Users, as: 'jobOwner' }, { model: Stack, as: 'requiredTech' }]
      });
      return jobs;
    }
    const job = await Job.findOne({
      where: { id: data },
      include: [{ model: Users, as: 'jobOwner' }, { model: Stack, as: 'requiredTech' }]
    });
    return job;
  }

  /**
   * @description update job
   * @param {integer} id
   * @param {string} data
   * @return {object} updated job
   */
  static async updateJob(id, data) {
    if (typeof data === 'string') {
      await Job.update(
        { status: data },
        { where: { id } },
      );
    }
    await Job.update(data, {
      where: {
        id
      },
    });
  }
}
