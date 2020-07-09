import express from 'express';
import userAccountRoutes from './userAccount.routes';
import jobRoutes from './job.routes';
import applicationRoutes from './application.routes';

const app = express.Router();

app.use('/api/', userAccountRoutes);
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);

export default app;
