import express from 'express';
import serverless from 'serverless-http';
import countriesRouter from './routes/countries.js';
import healthcheckRouter from './routes/healthcheck.js';
import otherRouter from './routes/other.js';

const app = express();

app.use('/countries', countriesRouter);
app.use('/healthcheck', healthcheckRouter);
app.use('*', otherRouter);

export const server = serverless(app);
