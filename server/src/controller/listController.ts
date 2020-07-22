import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpStatus, { CREATED, OK, NO_CONTENT } from 'http-status-codes';
import logger from '@shared/Logger';
import { IList } from '@type';
import ListDao, { IListDao } from '../daos/List/listDao';

export interface IListController {
    // get: (req: Request, res: Response) => Promise<Response<any>>;
    // getAll: () => Promise<IUser[]>;
    add: (req: Request, res: Response) => Promise<Response<any>>;
    update: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<void>;
    updateOrder: (req: Request, res: Response) => Promise<any>;

}

const listDao:IListDao = new ListDao();

const listController:IListController = {
    add: async (req: Request, res: Response) => {
        logger.info('POST: apis/users/:userID/lists');
        const { listName, userID } = req.body;
        const list:IList = {
            userID,
            listName,
        };

        list.listID = await listDao.add(list);

        return res.status(CREATED).json({ ...list });
    },
    update: async (req:Request, res: Response) => {
        logger.info('PUT: apis/users/:userID/lists/:listID');
        const params = req.params as ParamsDictionary;
        const { listID, listName } = req.body;
        console.log(req.body);
        const list:IList = {
            listID,
            listName,
        };

        list.updated = await listDao.update(list);
        return res.status(OK).json({ ...list });
    },

    updateOrder: async (req:Request, res: Response) => {
        logger.info('PUT: apis/users/:userID/lists/:listID/order');
        const { listID, orders } = req.body;
        const list:IList = {
            listID,
            orders,
        };
        await listDao.updateOrder(list);
        return res.status(OK).json({ ...list });
    },

    delete: async (req:Request, res: Response) => {
        logger.info('DELETE: apis/users/:userID/lists/:listID');
        const { listID } = req.params as ParamsDictionary;
        await listDao.delete(parseInt(listID));
        return res.status(NO_CONTENT).end();
    },
};



export default listController;