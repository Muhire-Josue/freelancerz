import dotenv from 'dotenv';
import axios from 'axios';
import ProfileService from '../services/profile.service';

const { createUserProfile } = ProfileService;

dotenv.config();
/**
 * @description fetch github user data
 * @param {username} username
 * @returns {object} user data or null if data not found
 */
const githubUserData = async (username) => {
  if (username) {
    try {
      const res = await axios.get(`${process.env.GITHUB_API_URL}/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }
};

/**
 * @description find years of experience
 * @param {string} createdAt
 * @param {string} updatedAt
 * @returns {integer} it returns the difference between the two dates
 */

const getYearsOfExperience = (createdAt, updatedAt) => {
  const yearsOfExperience = new Date(updatedAt).getFullYear() - new Date(createdAt).getFullYear();
  return parseInt(yearsOfExperience, 10);
};
/**
 * @description create profile
 * @param {object} githubData
 * @param {integer} userId
 * @returns {null} nothing
 */
const createProfile = async (githubData, userId) => {
  const profileData = {};
  const createdAt = githubData.created_at;
  const updatedAt = githubData.updated_at;
  profileData.yearsOfExperience = getYearsOfExperience(createdAt, updatedAt);
  profileData.avatar_url = githubData.avatar_url;
  profileData.html_url = githubData.html_url;
  profileData.bio = githubData.bio;
  profileData.public_repos = githubData.public_repos;
  profileData.userId = userId;
  await createUserProfile(profileData);
};
export default {
  githubUserData,
  createProfile
};
