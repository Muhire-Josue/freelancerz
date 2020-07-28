import express from 'express';
import userAccountRoutes from './userAccount.routes';
import jobRoutes from './job.routes';
import applicationRoutes from './application.routes';
import profileRoutes from './profile.routes';

const app = express.Router();

app.use('/api', jobRoutes);
app.use('/api', userAccountRoutes);
app.use('/api', applicationRoutes);
app.use('/api', profileRoutes);

export default app;
