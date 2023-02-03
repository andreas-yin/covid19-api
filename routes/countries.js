const express = require('express');
const { sendData, methodNotAllowed } = require('../controllers/countries');

const router = express.Router();

/*
GET requests to retrieve COVID cases for all countries
and any requests other than GET
*/
router.route('/').get(sendData).all(methodNotAllowed);

/*
GET requests to retrieve COVID cases for a specific country,
GET requests to retrieve a specific datapoint of a country's COVID cases 
via a query parameter that has a key of 'datapoint',
e.g. /countries/Germany?datapoint=todayCases
and any requests other than GET
*/
router.route('/:country').get(sendData).all(methodNotAllowed);

module.exports = router;
