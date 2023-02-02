const express = require('express');
const { sendData, methodNotAllowed } = require('../controllers/countriesController');

const router = express.Router();

//GET requests to retrieve the COVID cases for all countries
router.route('/countries')    
    .get(sendData)

    //Handle any requests other than GET
    .all(methodNotAllowed);


//GET requests to retrieve the COVID cases for one specific country and
//GET requests to retrieve a specific datapoint of a country's COVID cases via a query parameter that has a key of 'datapoint',
//e.g. /countries/Germany?datapoint=todayCases
router.route('/countries/:country')    
    .get(sendData)

    //Handle any requests other than GET
    .all(methodNotAllowed);


module.exports = router;