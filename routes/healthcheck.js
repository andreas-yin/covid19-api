import express from 'express';
import performHealthcheck from '../controllers/healthcheck.js';

const router = express.Router();

router.get('/', performHealthcheck);

export default router;
