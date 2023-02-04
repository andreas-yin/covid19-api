import { Router } from 'express';
import { getCountries, getCountry } from '../controllers/countries.js';
import { methodNotAllowed } from '../controllers/methodNotAllowed.js';

export const countriesRouter = Router();

// GET requests to retrieve COVID cases for all countries and any requests other than GET
countriesRouter.route('/').get(getCountries).all(methodNotAllowed);

// GET requests to retrieve COVID cases for a specific country and any requests other than GET
countriesRouter.route('/:country').get(getCountry).all(methodNotAllowed);
