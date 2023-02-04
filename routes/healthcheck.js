import { Router } from 'express';
import { getHealthcheck } from '../controllers/healthcheck.js';
import {
  methodNotAllowed,
  internalServerError,
} from '../controllers/errorHandler.js';

export const healthcheckRouter = Router();

// GET requests to check the API's health
healthcheckRouter.get('/', getHealthcheck);

// Any requests other than GET
healthcheckRouter.all('/', methodNotAllowed);

// If any error occurs during the above, return 500 HTTP error
healthcheckRouter.use(internalServerError);
