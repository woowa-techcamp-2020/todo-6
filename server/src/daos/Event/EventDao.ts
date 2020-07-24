import {
    getSqlTime, getUpdatedInResonse,
    packetToJson,
} from '@daos/util';
import {
    IInitData, IList, ICard, IResultHeader, IEvent,
} from '@type';
import pool from '../db';
import { eventQuery } from '../query';



export interface IEventDao {
    // getAll: () => Promise<IUser[]>;
    getAll: () => Promise<IEvent []>;
    add: (event: IEvent) => Promise<any>;
}

class EventDao implements IEventDao {
    public async add(event: IEvent): Promise<any> {
        const [resultHeader] = await pool.query(eventQuery.add(event));
        const res = packetToJson(resultHeader) as any;
        const dataIdx = 1;
        const firstIdx = 0;
        return res[dataIdx][firstIdx];
    }

    public async getAll(): Promise<IEvent []> {
        const [rowData] = await pool.query(eventQuery.getAll());
        return packetToJson(rowData) as IEvent [];
    }
}

export default EventDao;
