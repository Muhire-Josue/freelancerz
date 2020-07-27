import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const getGithubUserData = async (username) => {
  try {
    const res = await axios.get(`${process.env.GITHUB_API_URL}/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    return res.data;
  } catch (error) {
    return null;
  }
};
export default getGithubUserData;
