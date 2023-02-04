import { Router } from 'express';
import { methodNotAllowed } from '../controllers/methodNotAllowed.js';
import invalidPath from '../controllers/other.js';

export const otherRouter = Router();

// Handle requests to a path that is not available
otherRouter.route('/').get(invalidPath).all(methodNotAllowed);
