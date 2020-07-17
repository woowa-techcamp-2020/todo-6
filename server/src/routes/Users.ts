import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import UserDaoTest from '@daos/User/UserDao.mock';
import UserDao from '@daos/User/UserDao';
import { paramMissingError } from '@shared/constants';
import envOptions from '../LoadEnv';

// Init shared
const router = Router();

let userDao:any = null;

if(envOptions.db === 'real') {
    userDao = new UserDao();
}else{
    userDao = new UserDaoTest();
}


/** ****************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ***************************************************************************** */

router.get('/all', async (req: Request, res: Response) => {
    const userData = await userDao.getAll();
    return res.status(OK).json({ userData });
});


/** ****************************************************************************
 *                       Add One - "POST /api/users/add"
 ***************************************************************************** */

router.post('/add', async (req: Request, res: Response) => {
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

router.put('/update', async (req: Request, res: Response) => {
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

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.getOne(id);
    return res.status(OK).end();
});


/** ****************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ***************************************************************************** */

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});


/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default router;
