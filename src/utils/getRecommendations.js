/**
 * @description find the how much percentage the required skills matches dev skills
 * @param {array} requiredSkills
 * @param {array} devSkills
 * @returns {integer} it returns the percentage of how much required skills matches dev skills
 */
const getDevSkillsPercentage = (requiredSkills, devSkills) => {
  let count = 0;
  for (let i = 0; i < devSkills.length; i++) {
    if (
      requiredSkills
        .map((skill) => skill.toLowerCase())
        .includes(devSkills[i].toLowerCase())
    ) {
      count += 1;
    }
  }
  return Math.ceil((count * 100) / requiredSkills.length);
};

const getDevRecommendation = (requiredSkill, devSkill) => {
  let level;
  const recommendationPercentage = getDevSkillsPercentage(requiredSkill, devSkill);
  if (recommendationPercentage < 25) {
    level = 'Low';
  }
  if (recommendationPercentage <= 50) {
    level = 'Medium';
  } else {
    level = 'High';
  }
  return level;
};
/**
 * @description returns all applications with respective recommendations
 * @param {array} applications
 * @returns {array} returns all applications with recommendations for each applications
 */
const getRecommendationForAllApplicants = (applications) => {
  const applicationsWithRecommendation = [];
  let devSkills;
  let requiredSkills;
  for (let i = 0; i < applications.length; i += 1) {
    devSkills = applications[i].users.stackId;
    requiredSkills = applications[i].job.stackId;
    devSkills = devSkills.split(',');
    requiredSkills = requiredSkills.split(',');
    applications[i].dataValues.recommendation = getDevRecommendation(requiredSkills, devSkills);
    applicationsWithRecommendation.push(applications[i]);
  }
  return applicationsWithRecommendation;
};

const getApplicationWithRecommendation = application => {
  const devSkills = application.users.stackId.split(',');
  const requiredSkills = application.job.stackId.split(',');
  application.dataValues.recommendation = getDevRecommendation(requiredSkills, devSkills);
  return application;
};

export default {
  getDevRecommendation,
  getDevSkillsPercentage,
  getRecommendationForAllApplicants,
  getApplicationWithRecommendation,
};
