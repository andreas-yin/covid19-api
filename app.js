const express = require('express');
const serverless = require('serverless-http');
const countriesRouter = require('./routes/countries');
const healthcheckRouter = require('./routes/healthcheck');

const app = express();

app.use('/countries', countriesRouter);
app.use('/healthcheck', healthcheckRouter);

module.exports.server = serverless(app);
