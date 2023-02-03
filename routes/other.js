import express from 'express';
import methodNotAllowed from '../controllers/methodNotAllowed.js';
import invalidPath from '../controllers/other.js';

const router = express.Router();

// Handle requests to a path that is not available
router.route('/').get(invalidPath).all(methodNotAllowed);

export default router;
