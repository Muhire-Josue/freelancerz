import express from 'express';
import userAccount from './userAccount.routes';

const app = express.Router();

app.use('/user/', userAccount);

export default app;
