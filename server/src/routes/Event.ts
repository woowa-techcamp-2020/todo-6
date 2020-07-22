import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import eventController from '../controller/eventController';

// Init shared
const eventRouter = Router();


// BasicURL:  /apis/users/:userID/lists/:listID/cards

eventRouter.post('', eventController.add);

eventRouter.get('', eventController.getAll);



export default eventRouter;
