import express from 'express';
import serverless from 'serverless-http';
import { router as countriesRouter } from './routes/countries.js';
import { router as healthcheckRouter } from './routes/healthcheck.js';
import { router as otherRouter } from './routes/other.js';

const app = express();

app.use('/countries', countriesRouter);
app.use('/healthcheck', healthcheckRouter);
app.use('*', otherRouter);

export const server = serverless(app);
