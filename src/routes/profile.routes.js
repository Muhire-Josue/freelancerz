import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import ProfileController from '../controllers/profile.controller';

const { userProfile, editProfile } = ProfileController;
const routes = express.Router();

routes.post('/profile', [tokenAuthentication], userProfile);
routes.put('/profile/edit', [tokenAuthentication], editProfile);
export default routes;
