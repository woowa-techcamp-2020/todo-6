import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { CREATED, OK, BAD_REQUEST } from 'http-status-codes';
import UserDao from '@daos/User/UserDao';
import logger from '@shared/Logger';
import { ICard, IList, IUser } from '@type';
import envOptions from '../LoadEnv';

export interface IUserController {
    get: (req: Request, res: Response) => Promise<Response<any>>;
    // getAll: () => Promise<IUser[]>;
    add: (req: Request, res: Response) => Promise<Response<any>>;
    updateOrder: (req: Request, res: Response) => Promise<any>;

    // delete: (id: number) => Promise<void>;
}

const userDao:UserDao = new UserDao();



const userController:IUserController = {
    get: async (req: Request, res: Response) => {
        logger.info('Request: apis/users/:id');
        const { userID } = req.params as ParamsDictionary;
        if(isNaN(Number(userID))) {
            const dataIndex = 0;
            const userData = (await userDao.getUser(userID))[dataIndex];
            if(userData?.userID) {
                return res.status(OK).json({ ...userData });
            }
            return res.status(BAD_REQUEST).send("can't find user");
        }
        const userData = await userDao.get(parseInt(userID));
        return res.status(OK).json({ userData });
    },
    add: async (req: Request, res: Response) => {
        logger.info('POST: apis/users');
        const { password, id } = req.body;
        const user:IUser = {
            password,
            id,
        };
        user.userID = await userDao.add(user);
        return res.status(CREATED).json({ ...user });
    },

    updateOrder: async (req:Request, res: Response) => {
        logger.info('PUT: api/users/:userID/orders');
        const params = req.params as ParamsDictionary;
        const { userID, orders } = req.body;
        console.log(req.body);
        const user:IUser = {
            userID,
            orders,
        };

        await userDao.updateOrder(user);
        return res.status(OK);
    },


};







export default userController;