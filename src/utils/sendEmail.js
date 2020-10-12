import sendEmail from './emailConfig';

const { sendEmailNotification } = sendEmail;

/**
 * @description sends application approval email
 * @param {string} email
 * @param {string} firstName
 * @param {string} link
 * @param {string} applicationJobApproved
 * @param {string} approvedApplicationSubject
 * @returns {null} it returns nothing
 */
const approvedApplicationEmail = (email, firstName, link = '#', applicationJobApproved, approvedApplicationSubject) => sendEmailNotification(email, firstName, link, applicationJobApproved, approvedApplicationSubject);
export default {
  approvedApplicationEmail,
};
