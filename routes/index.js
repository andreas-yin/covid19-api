import { Router } from 'express';
import { countriesRouter } from './countries.js';
import { healthcheckRouter } from './healthcheck.js';
import { pathNotFoundRouter } from './pathNotFound.js';

export const apiRouter = Router();

apiRouter.use('/countries', countriesRouter);
apiRouter.use('/healthcheck', healthcheckRouter);
apiRouter.use('*', pathNotFoundRouter);
