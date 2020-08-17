import StackService from '../services/stack.service';

const { getStacksForALLJobs } = StackService;

/**
 * @description this function generates stacks for each id in an array
 * @param {array} IDs
 * @returns {array} it returns an array of stacks based on the IDs
 */
const generateStacksFromArrayOfId = async (IDs) => {
  const stacks = await getStacksForALLJobs(IDs);
  return stacks;
};
/**
 * @description finds stacks for job in an array and associates each job with stacks
 * @param {array} jobs
 * @returns {array} array of jobs with stacks
 */
const generateStacksForJobs = async (jobs) => {
  const stacks = [];
  for (let i = 0; i < jobs.length; i += 1) {
    let jobIds = jobs[i].dataValues.stackId.split(',');
    jobIds = jobIds.map(jobId => parseInt(jobId, 10));
    stacks.push(generateStacksFromArrayOfId(jobIds));
  }
  const result = await Promise.all(stacks);
  jobs.forEach((job, i) => {
    job.dataValues.stacks = result[i];
  });
  return jobs;
};

/**
 * @description generates stacks for a specific job
 * @param {object} job
 * @returns {object} it returns the job with stacks
 */
const generateStacksForAJob = async (job) => {
  let stackIds = job.stackId.split(',');
  stackIds = stackIds.map(id => parseInt(id, 10));
  job.stacks = await generateStacksFromArrayOfId(stackIds);
  return job;
};

/**
 * @description get stacks for job application
 * @param {object} application
 * @returns {object} it returns an application with job stacks
 */
const generateStacksForJobApplication = async (application) => {
  let stackIds = application.job.dataValues.stackId.split(',');
  stackIds = stackIds.map(id => parseInt(id, 10));
  application.job.dataValues.stacks = await generateStacksFromArrayOfId(stackIds);
  return application;
};

export default {
  generateStacksFromArrayOfId,
  generateStacksForJobs,
  generateStacksForAJob,
  generateStacksForJobApplication,
};
