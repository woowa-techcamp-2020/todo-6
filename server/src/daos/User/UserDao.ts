import User, { IUser } from '@entities/User';
import { packetToJson } from '@daos/util';
import { IInitData, IList, ICard } from '@type';
import pool from '../db';
import { userQuery } from '../query';

export interface IUserDao {
    get: (id: number) => Promise<IInitData>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

interface IData {
    listID:number,
    listName:string,
    cardID:number,
    cardText:string,
    orders: string,
    created:Date
}

class UserDao implements IUserDao {
    private addDataToLists = (lists: {[key:number]: IList}, {
        listID, listName, cardID, cardText, created, orders,
    }: IData) => {
        if(lists[listID]) {
            lists[listID]?.cards?.push({
                cardID,
                cardText,
                created,
            });
        }else {
            lists[listID] = {
                listID,
                listName,
                orders,
                cards: [],
            };

            if(cardID) {
                lists[listID].cards?.push({
                    cardID,
                    cardText,
                    created,
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

        return this.toInitDataFormat(res);
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
    public async add(user: IUser): Promise<void> {
        // TODO

        return {} as any;
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
