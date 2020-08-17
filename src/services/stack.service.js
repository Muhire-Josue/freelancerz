import models from '../database/models/index';

const { Stack, Sequelize } = models;

/**
 * @description this service is for the stack model (stack or technologies)
 */
export default class StackService {
  /**
     * @description save a stack
     * @param {object} stack
     * @returns{null} it returns nothing
     */
  static async saveStack(stack) {
    const data = await Stack.create(stack);
    return data;
  }

  /**
   * @description finds stack by id
   * @param {integer} id
   * @returns {object} the stack found
   */
  static async getStackById(id) {
    const stack = await Stack.findOne({
      where: { id }
    });
    return stack;
  }

  /**
 * @description finds all stacks
 * @returns {array} an array of all stacks
 */
  static async getAllStack() {
    const stacks = await Stack.findAll();
    return stacks;
  }

  /**
   * @description find stacks based on an array of stackIds
   * @param {array} value array of stackIds
   * @returns {array} array of stacks
   */
  static async getStacksForALLJobs(value) {
    const stacks = await Stack.findAll({
      where: {
        id: {
          [Sequelize.Op.and]: [
            { [Sequelize.Op.in]: value }
          ]
        },
      },
    });
    return stacks;
  }
}
