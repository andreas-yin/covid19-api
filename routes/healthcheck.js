import { Router } from 'express';
import { getHealthcheck } from '../controllers/healthcheck.js';
import { methodNotAllowed } from '../controllers/methodNotAllowed.js';

export const healthcheckRouter = Router();

// GET requests to check the API's health and any requests other than GET
healthcheckRouter.route('/').get(getHealthcheck).all(methodNotAllowed);
