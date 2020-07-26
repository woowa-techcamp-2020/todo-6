import {
    getUpdatedInResonse,
    packetToJson,
} from '@daos/util';
import {
    IInitData, IList, ICard, IResultHeader, IOrderData,
} from '@type';
import pool from '../db';
import { cardQuery, listQuery, userQuery } from '../query';



export interface IListDao {
    // get: (id: number) => Promise<IInitData>;
    // getAll: () => Promise<IUser[]>;
    add: (list: IList) => Promise<number>;
    update: (list: IList) => Promise<any>;
    delete: (listID: number) => Promise<void>;
    // getOrder: (listID: number) => Promise<void>;
    updateOrder: (list: IList) => Promise<void>;
    getAll: () => Promise<any>;
    updateListOrder: (orderData:IOrderData) => Promise<any>;
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

    public async updateListOrder(orderData:IOrderData): Promise<any> {
        console.log(listQuery.updateListOrder(orderData));
        await pool.query(listQuery.updateListOrder(orderData));
    }

    public async getAll(): Promise<any> {
        const [rowPacket] = await pool.query(listQuery.getAll());
        return (packetToJson(rowPacket) as any []);
    }
}

export default ListDao;
