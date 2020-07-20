import models from '../database/models';

const { Users } = models;

/**
 * @description This service deals with the User model
 */
export default class UserServices {
  /**
     * @description this service creates a new user in the db
     * @param {object} user
     * @returns {object} returns the newly created user object
     */
  static async createUser(user) {
    const newUser = Users.create(user);
    return newUser;
  }

  /**
 * @description finds a user in the db by email
 * @param {string} value the email of a user
 * @returns {object} it returns an object if found
 */
  static async getUserByEmailOrById(value) {
    let user;
    if (typeof value === 'string') {
      user = Users.findOne({ where: { email: value } });
      return user;
    }
    user = Users.findOne({ where: { id: value } });
    return user;
  }

  /**
   * @description changes value of getEmailNotification
   * @param {string} email
   * @param {boolean} status
   * @returns {object} null
   */
  static async changeEmailNotificationStatus(email, status) {
    await Users.update(
      { getEmailNotification: status },
      { where: { email } }
    );
  }
}
