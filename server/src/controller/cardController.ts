import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpStatus, { CREATED, OK } from 'http-status-codes';
import logger from '@shared/Logger';
import { ICard } from '@type';
import CardDao, { ICardDao } from '@daos/Card/CardDao';


export interface ICardController {
    // get: (req: Request, res: Response) => Promise<Response<any>>;
    // getAll: () => Promise<IUser[]>;
    add: (req: Request, res: Response) => Promise<void>;
    // update: (user: IUser) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

const cardDao:ICardDao = new CardDao();



const cardController:ICardController = {
    add: async (req: Request, res: Response) => {
        logger.info('Request: apis/users/:userID/lists/:listID/cards');
        const { listID, cardText, cardID } = req.body;
        const card:ICard = {
            listID,
            cardText,
        };
        cardDao.add(card);

        return res.status(CREATED).end();
    },
};







export default cardController;