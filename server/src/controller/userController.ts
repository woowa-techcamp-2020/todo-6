import { IUser } from '@entities/User';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { OK } from 'http-status-codes';
import UserDao from '@daos/User/UserDao';
import UserDaoTest from '@daos/User/UserDao.mock';
import logger from '@shared/Logger';
import envOptions from '../LoadEnv';

export interface IUserController {
    get: (req: Request, res: Response) => Promise<Response<any>>;
    // getAll: () => Promise<IUser[]>;
    // add: (user: IUser) => Promise<void>;
    // update: (user: IUser) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

let userDao:UserDao | UserDaoTest;

if(envOptions.db === 'mock') {
    userDao = new UserDaoTest();
}else{
    userDao = new UserDao();
}

// Empty object
const userController:IUserController = {
    get: async (req: Request, res: Response) => {
        logger.info('Request: apis/users/:id');
        const { id } = req.params as ParamsDictionary;
        const userData = await userDao.get(parseInt(id));
        return res.status(OK).json({ userData });
    },
};







export default userController;