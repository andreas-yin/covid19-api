import express from 'express';
import { getCountriesData, getCountryData } from '../controllers/countries.js';
import { methodNotAllowed } from '../controllers/methodNotAllowed.js';

export const router = express.Router();

// GET requests to retrieve COVID cases for all countries and any requests other than GET
router.route('/').get(getCountriesData).all(methodNotAllowed);

// GET requests to retrieve COVID cases for a specific country and any requests other than GET
router.route('/:country').get(getCountryData).all(methodNotAllowed);
