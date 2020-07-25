import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import UserDao from '@daos/User/UserDao';
import { paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import listRouter from './List';
import envOptions from '../LoadEnv';
import userController from '../controller/userController';
import eventRouter from './Event';

// Init shared
const userRouter = Router();

const userDao:UserDao = new UserDao();



userRouter.use('/:userId/events', eventRouter);
userRouter.use('/:userId/lists', listRouter);
/** ****************************************************************************
 *                    Get - "GET /api/users/:id"
 ***************************************************************************** */
userRouter.get('/:userID', userController.get);


/** ****************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ***************************************************************************** */

userRouter.get('/all', async (req: Request, res: Response) => {
    const userData = await userDao.getAll();
    return res.status(OK).json({ userData });
});


/** ****************************************************************************
 *                       Add One - "POST /api/users"
 ***************************************************************************** */

userRouter.post('', userController.add);


/** ****************************************************************************
 *                       Update - "PUT /api/users/update"
 ***************************************************************************** */

userRouter.put('/:userId/orders', userController.updateOrder);




/** ****************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ***************************************************************************** */

userRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});


/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default userRouter;
