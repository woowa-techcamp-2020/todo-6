import {
    getSqlTime, getUpdatedInResonse,
    packetToJson,
} from '@daos/util';
import {
    IInitData, IList, ICard, IResultHeader, 
} from '@type';
import pool from '../db';
import { cardQuery } from '../query';



export interface ICardDao {
    // get: (id: number) => Promise<IInitData>;
    // getAll: () => Promise<IUser[]>;
    add: (card: ICard) => Promise<number>;
    update: (card: ICard) => Promise<any>;
    delete: (cardID: number) => Promise<void>;
}

class CardDao implements ICardDao {
    public async add(card: ICard): Promise<any> {
        const [resultHeader] = await pool.query(cardQuery.add(card));
        const res = packetToJson(resultHeader) as IResultHeader;

        return res.insertId;
    }

    public async update(card: ICard): Promise<any> {
        console.log(cardQuery.update(card));
        const [resultHeader] = await pool.query(cardQuery.update(card));
        const res = packetToJson(resultHeader) as any[];
        return getUpdatedInResonse(res);
    }

    public async delete(cardID: number): Promise<any> {
        await pool.query(cardQuery.delete(cardID));
    }
}

export default CardDao;
