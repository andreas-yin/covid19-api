import express from 'express';
import serverless from 'serverless-http';
import { apiRouter } from './routes/index.js';

const app = express();

app.use('/', apiRouter);

export const server = serverless(app);
