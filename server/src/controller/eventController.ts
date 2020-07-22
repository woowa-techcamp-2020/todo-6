import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpStatus, { CREATED, OK, NO_CONTENT } from 'http-status-codes';
import logger from '@shared/Logger';
import EventDao, { IEventDao } from '@daos/Event/EventDao';
import { IEvent } from '@type';



export interface IEventController {
    getAll: (req: Request, res: Response) => Promise<Response<any>>;
    add: (req: Request, res: Response) => Promise<Response<any>>;
}

const eventDao:IEventDao = new EventDao();

const eventController:IEventController = {
    add: async (req: Request, res: Response) => {
        logger.info('POST: apis/users/:userID/events');
        const {
            userID, eventTypeID, card, list, beforeList,  
        } = req.body;
        const event:IEvent = {
            userID,
            eventTypeID,
            ...(card === undefined ? null : { card }),
            ...(list === undefined ? null : { list }),
            ...(beforeList === undefined ? null : { beforeList }),
        };
        event.logID = await eventDao.add(event);
        return res.status(CREATED).json({ ...event });
    },
    getAll: async (req: Request, res: Response) => {
        logger.info('GET: apis/users/:userID/events');
        const events = await eventDao.getAll();
        return res.status(CREATED).json(events);
    },
};







export default eventController;