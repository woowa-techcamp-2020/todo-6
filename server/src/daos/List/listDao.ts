import {
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
}

class ListDao implements IListDao {
    public async add(list: IList): Promise<any> {
        const [resultHeader] = await pool.query(listQuery.add(list));
        const res = packetToJson(resultHeader) as IResultHeader;

        return res.insertId;
    }

    public async update(list: IList): Promise<any> {
        const [resultHeader] = await pool.query(listQuery.update(list));
        const res = packetToJson(resultHeader) as IResultHeader;
        console.log(res);
        return res.insertId;
    }

    public async delete(listID: number): Promise<any> {
        await pool.query(listQuery.delete(listID));
    }
}

export default ListDao;
