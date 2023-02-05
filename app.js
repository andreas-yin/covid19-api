import express from 'express';
import { apiRouter } from './routes/index.js';

export const app = express();

app.use('/', apiRouter);
