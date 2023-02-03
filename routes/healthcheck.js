const express = require('express');
const performHealthcheck = require('../controllers/healthcheck');

const router = express.Router();

router.get('/', performHealthcheck);

module.exports = router;
