import { packetToJson } from '@daos/util';
import {
    IInitData, IList, ICard, IUser, IResultHeader,
} from '@type';
import pool from '../db';
import { cardQuery, userQuery } from '../query';

export interface IUserDao {
    get: (id: number) => Promise<IInitData>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<number>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
    getUser: (id: string | string) => Promise<any []>;
}

interface IData {
    listID:number,
    listName:string,
    cardID:number,
    cardText:string,
    orders: string,
    userID: number,
    created:Date
}

class UserDao implements IUserDao {
    /**
     *
     */
    public async getUser(id: string | number): Promise<any []> {
        let res;
        if(typeof id === 'number') {
            const [rowPacket] = await pool.query(userQuery.getUserID(id));
            res = packetToJson(rowPacket) as any[];
        }else{
            const [rowPacket] = await pool.query(userQuery.getUser(id));
            res = packetToJson(rowPacket) as any[];
        }

        return res as any [];
    }


    private addDataToLists = (lists: {[key:number]: IList}, {
        listID, listName, cardID, cardText, created, orders, userID,
    }: IData) => {
        if(lists[listID]) {
            lists[listID]?.cards?.push({
                cardID,
                cardText,
                created,
                userID,
            });
        }else {
            lists[listID] = {
                listID,
                listName,
                orders,
                userID,
                cards: [],
            };

            if(cardID) {
                lists[listID].cards?.push({
                    cardID,
                    cardText,
                    created,
                    userID,
                });
            }
        }
    }


    /**
     * @description make response object to IInitData type object
     * @param {any[]} res
     * @returns {IInitData}
     */
    private toInitDataFormat(res: any[]): IInitData {
        const initData: IInitData = {
            data: [],
        };

        const lists: {[key:number]: IList} = {};

        res.forEach((data) => {
            this.addDataToLists(lists, data);
        });

        Object.keys(lists).forEach((listID) => {
            initData.data.push(lists[parseInt(listID)]);
        });



        return initData;
    }

    public async get(id: number): Promise<IInitData> {
        const [rowPacket] = await pool.query(userQuery.getUserData(id));
        const res = packetToJson(rowPacket) as any[];
        const user = this.getUser(id);
        console.log(user);
        const initData:IInitData = this.toInitDataFormat(res);
        return initData;
    }

    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        return [] as any;
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<number> {
        const [resultHeader] = await pool.query(userQuery.add(user));
        const res = packetToJson(resultHeader) as IResultHeader;

        return res.insertId;
    }

    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default UserDao;
