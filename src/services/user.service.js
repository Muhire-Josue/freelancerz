import { Sequelize } from 'sequelize';
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
 * @param {string} email the email of a user
 * @returns {object} it returns an object if found
 */
  static async getUserByEmail(email) {
    const user = Users.findOne({ where: { email } });
    return user;
  }
}
