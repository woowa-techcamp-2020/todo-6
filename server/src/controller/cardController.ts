import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpStatus, { CREATED, OK, NO_CONTENT } from 'http-status-codes';
import logger from '@shared/Logger';
import { ICard } from '@type';
import CardDao, { ICardDao } from '@daos/Card/CardDao';


export interface ICardController {
    // get: (req: Request, res: Response) => Promise<Response<any>>;
    // getAll: () => Promise<IUser[]>;
    add: (req: Request, res: Response) => Promise<Response<any>>;
    update: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<void>;
}

const cardDao:ICardDao = new CardDao();

const cardController:ICardController = {
    add: async (req: Request, res: Response) => {
        logger.info('POST: apis/users/:userID/lists/:listID/cards');
        const { listID, cardText } = req.body;
        const card:ICard = {
            listID,
            cardText,
        };
        card.cardID = await cardDao.add(card);

        return res.status(CREATED).json({ ...card });
    },
    update: async (req:Request, res: Response) => {
        logger.info('PUT: api/users/:userID/lists/:listID/cards/:cardID');
        const params = req.params as ParamsDictionary;
        console.log(params);
        const { listID, cardText, cardID } = req.body;
        console.log(req.body);
        const card:ICard = {
            listID,
            cardText,
            cardID,
        };
        card.updated = await cardDao.update(card);
        return res.status(CREATED).json({ ...card });
    },
    delete: async (req:Request, res: Response) => {
        logger.info('DELETE: api/users/:userID/lists/:listID/cards/:cardID');
        const { cardID } = req.params as ParamsDictionary;
        await cardDao.delete(parseInt(cardID));
        return res.status(NO_CONTENT).end();
    },
};







export default cardController;