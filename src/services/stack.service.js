import models from '../database/models/index';

const { Stack } = models;

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
}
