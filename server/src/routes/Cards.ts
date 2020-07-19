import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import cardController from '../controller/cardController';

// Init shared
const cardRouter = Router();


// POST /apis/users/:userID/lists/:listID/cards
cardRouter.post('', cardController.add);


cardRouter.put('/update', async (req: Request, res: Response) => res.status(OK).end());






export default cardRouter;
