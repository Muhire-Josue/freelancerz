/* eslint-disable arrow-parens */
/**
 *
 * @param {integer} percentage
 * @returns {string} it returns {low, medium, high} based on how much the
 user stack matches the job's required stack
 */
const convertPercentageToLevel = (percentage) => {
  let level;
  if (percentage <= 25) {
    level = 'Low';
  } else if (percentage <= 50) {
    level = 'Medium';
  } else {
    level = 'High';
  }
  return level;
};

/**
 *
 * @param {string} JobStacks
 * @param {string} devStacks
 * @returns {string} it returns {low, medium, high} based on how much the
 user stack matches the job's required stack
 */
const checkStackMatch = (JobStacks, devStacks) => {
  let count = 0;
  for (let i = 0; i < devStacks.length; i++) {
    if (JobStacks.map(skill => skill.toLowerCase()).includes(devStacks[i].toLowerCase())) {
      count += 1;
    }
  }
  const percentage = Math.ceil((count * 100) / JobStacks.length);
  const stackMatchLevel = convertPercentageToLevel(percentage);
  return stackMatchLevel;
};
export default checkStackMatch;
