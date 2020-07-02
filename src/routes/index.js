import express from 'express';
import userAccountRoutes from './userAccount.routes';
import jobRoutes from './job.routes';

const app = express.Router();

app.use('/api/', userAccountRoutes);
app.use('/api', jobRoutes);

export default app;
