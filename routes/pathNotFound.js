import { Router } from 'express';
import { invalidPath, methodNotAllowed } from '../controllers/errorHandler.js';

export const pathNotFoundRouter = Router();

// Handle requests to a path that is not available
pathNotFoundRouter.route('/').get(invalidPath).all(methodNotAllowed);
