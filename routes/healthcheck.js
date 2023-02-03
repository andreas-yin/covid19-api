import express from 'express';
import performHealthcheck from '../controllers/healthcheck.js';
import methodNotAllowed from '../controllers/methodNotAllowed.js';

const router = express.Router();

// GET requests to check the API's health and any requests other than GET
router.route('/').get(performHealthcheck).all(methodNotAllowed);

export default router;
