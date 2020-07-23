import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import UserDaoTest from '@daos/User/UserDao.mock';
import UserDao from '@daos/User/UserDao';
import { paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import listRouter from './List';
import envOptions from '../LoadEnv';
import userController from '../controller/userController';
import eventRouter from './Event';

// Init shared
const userRouter = Router();

let userDao:UserDao | UserDaoTest;

if(envOptions.db === 'mock') {
    userDao = new UserDaoTest();
}else{
    userDao = new UserDao();
}

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

userRouter.post('', async (req: Request, res: Response) => {
    const cardText = req.body;
    // if (!user) {
    //     return res.status(BAD_REQUEST).json({
    //         error: paramMissingError,
    //     });
    // }

    await userDao.add(cardText);
    return res.status(CREATED).end();
});


/** ****************************************************************************
 *                       Update - "PUT /api/users/update"
 ***************************************************************************** */

userRouter.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});




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
