import express from 'express';
import methodNotAllowed from '../controllers/methodNotAllowed.js';
import invalidPath from '../controllers/other.js';

const router = express.Router();

router.route('/').get(invalidPath).all(methodNotAllowed);

export default router;
