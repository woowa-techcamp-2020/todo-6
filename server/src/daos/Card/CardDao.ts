import {
    packetToJson,
} from '@daos/util';
import { IInitData, IList, ICard } from '@type';
import pool from '../db';
import { cardQuery } from '../query';



export interface ICardDao {
    // get: (id: number) => Promise<IInitData>;
    // getAll: () => Promise<IUser[]>;
    add: (card: ICard) => Promise<void>;
    // update: (user: IUser) => Promise<void>;
    // delete: (id: number) => Promise<void>;
}

class CardDao implements ICardDao {
    public async add(card: ICard): Promise<any> {
        const [rowPacket] = await pool.query(cardQuery.add(card));
        return packetToJson(rowPacket);
    }
}

export default CardDao;
