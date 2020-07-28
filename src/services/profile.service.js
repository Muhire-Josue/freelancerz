import models from '../database/models';

const { Profile, Users } = models;

/**
 * @description This service deals with the User model
 */
export default class ProfileService {
  /**
     * @description save new profile
     * @param {object} user
     * @return {null} nothing
     */
  static async createUserProfile(user) {
    await Profile.create(user);
  }

  /**
     * @description save new profile
     * @param {integer} userId
     * @return {object} profile
     */
  static async getProfileByUserId(userId) {
    const profile = await Profile.findOne({
      where: { userId },
      include: [{ model: Users, as: 'user' }]
    });
    return profile;
  }
}
