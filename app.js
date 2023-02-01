const express = require('express');
const serverless = require('serverless-http');
const app = express();

const countriesRouter = require('./routes/countries')
const healthcheckRouter = require('./routes/healthcheck')

app.use('/covid', countriesRouter);
app.use('/healthcheck', healthcheckRouter);

module.exports.server = serverless(app);