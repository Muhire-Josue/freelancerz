const generateJobIdFromArray = jobs => {
  const jobIds = jobs.map(job => job.dataValues.jobId);
  return jobIds;
};
export default generateJobIdFromArray;
