import { Router } from 'express';
import { getCountries, getCountry } from '../controllers/countries.js';
import {
  internalServerError,
  methodNotAllowed,
} from '../controllers/errorHandler.js';

export const countriesRouter = Router();

// GET requests to retrieve summary of COVID cases for all countries and any requests other than GET
countriesRouter.route('/').get(getCountries).all(methodNotAllowed);

/*
GET requests to retrieve summary of COVID cases (or a single datapoint thereof) 
for a specific country 
and any requests other than GET
*/
countriesRouter.route('/:country').get(getCountry).all(methodNotAllowed);

// If any error occurs during the above, return 500 HTTP error
countriesRouter.use(internalServerError);
