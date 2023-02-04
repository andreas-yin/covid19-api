import { Router } from 'express';
import { countriesRouter } from './countries.js';
import { healthcheckRouter } from './healthcheck.js';
import { otherRouter } from './other.js';

export const apiRouter = Router();

apiRouter.use('/countries', countriesRouter);
apiRouter.use('/healthcheck', healthcheckRouter);
apiRouter.use('*', otherRouter);
