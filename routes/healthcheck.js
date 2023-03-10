import { Router } from 'express';
import { getHealthcheck } from '../controllers/healthcheck.js';
import {
  methodNotAllowed,
  internalServerError,
} from '../controllers/errorHandler.js';

export const healthcheckRouter = Router();

// GET requests to check the API's health and any requests other than GET
healthcheckRouter.route('/').get(getHealthcheck).all(methodNotAllowed);

// If any error occurs during the above, return HTTP 500 error
healthcheckRouter.use(internalServerError);
