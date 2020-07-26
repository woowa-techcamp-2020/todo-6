import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import CardRouter from './Cards';
import listController from '../controller/listController';

// Init shared
const listRouter = Router();

listRouter.use('/:listID/cards', CardRouter);

listRouter.post('', listController.add);

listRouter.put('/order', listController.updateListOrder);
listRouter.put('/:listID/orders', listController.updateOrder);
listRouter.put('/:listID', listController.update);

listRouter.delete('/:listID', listController.delete);


export default listRouter;
