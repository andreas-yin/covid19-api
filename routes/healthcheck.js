import { Router } from 'express';
import { getHealthcheck } from '../controllers/healthcheck.js';
import { methodNotAllowed } from '../controllers/methodNotAllowed.js';

export const router = Router();

// GET requests to check the API's health and any requests other than GET
router.route('/').get(getHealthcheck).all(methodNotAllowed);
