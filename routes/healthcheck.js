const express = require('express');
const performHealthcheck = require('../controllers/healthcheckController');

const router = express.Router();

router.get('/', performHealthcheck);

module.exports = router;