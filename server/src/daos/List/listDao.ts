import {
    getUpdatedInResonse,
    packetToJson,
} from '@daos/util';
import {
    IInitData, IList, ICard, IResultHeader, 
} from '@type';
import pool from '../db';
import { cardQuery, listQuery } from '../query';



export interface IListDao {
    // get: (id: number) => Promise<IInitData>;
    // getAll: () => Promise<IUser[]>;
    add: (list: IList) => Promise<number>;
    update: (list: IList) => Promise<any>;
    delete: (listID: number) => Promise<void>;
    // getOrder: (listID: number) => Promise<void>;
    updateOrder: (list: IList) => Promise<void>;
}

class ListDao implements IListDao {
    public async add(list: IList): Promise<any> {
        const [resultHeader] = await pool.query(listQuery.add(list));
        const res = packetToJson(resultHeader) as IResultHeader;
        return res.insertId;
    }

    public async update(list: IList): Promise<any> {
        const [resultHeader] = await pool.query(listQuery.update(list));
        const res = packetToJson(resultHeader) as any [];
        return getUpdatedInResonse(res);
    }

    public async delete(listID: number): Promise<any> {
        await pool.query(listQuery.delete(listID));
    }

    public async updateOrder(list: IList): Promise<any> {
        await pool.query(listQuery.updateOrder(list));
    }
}

export default ListDao;
