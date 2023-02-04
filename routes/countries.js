import express from 'express';
import { getCountries, getCountry } from '../controllers/countries.js';
import { methodNotAllowed } from '../controllers/methodNotAllowed.js';

export const router = express.Router();

// GET requests to retrieve COVID cases for all countries and any requests other than GET
router.route('/').get(getCountries).all(methodNotAllowed);

// GET requests to retrieve COVID cases for a specific country and any requests other than GET
router.route('/:country').get(getCountry).all(methodNotAllowed);
