import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import CardRouter from './Cards';

// Init shared
const listRouter = Router();

listRouter.use('/:listID/cards', CardRouter);


export default listRouter;
