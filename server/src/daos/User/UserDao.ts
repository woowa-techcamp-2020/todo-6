import { getUpdatedInResonse, packetToJson } from '@daos/util';
import {
    IInitData, IList, IUser, IResultHeader,
} from '@type';
import ListDao from '@daos/List/listDao';
import pool from '../db';
import { cardQuery, listQuery, userQuery } from '../query';

export interface IUserDao {
    get: (id: number) => Promise<IInitData>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<number>;
    updateOrder: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
    getUser: (id: string | string) => Promise<any []>;
}

interface IData {
    id: string,
    order: number
    listID:number,
    listName:string,
    cardID:number,
    cardText:string,
    orders: string,
    userID: number,
    isPrivate: number,
    created:Date
}

class UserDao implements IUserDao {
    listDao: ListDao;

    lists: {[key:number]: IList}

    constructor() {
        this.lists = {};
        this.listDao = new ListDao();
    }

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
        listID, cardID, cardText, created, userID, id,
    }: IData) => {
        if(cardID) {
            this.lists[listID].cards?.push({
                cardID,
                cardText,
                created,
                userID,
                id,
            });
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

        Object.keys(this.lists).forEach((listID) => {
            initData.data.push(this.lists[parseInt(listID)]);
        });



        return initData;
    }


    private initListObj(listsData: IList []) {
        listsData.forEach((list) => {
            this.lists[list.listID as number] = {
                ...list,
                cards: [],
            };
        });
    }

    public async get(id: number): Promise<IInitData> {
        const [rowPacket] = await pool.query(userQuery.getUserData(id));
        const res = packetToJson(rowPacket) as any[];
        const lists = await this.listDao.getAll();
        this.initListObj(lists);
        const userRes = await this.getUser(id);
        const user = userRes[0];
        const initData:IInitData = this.toInitDataFormat(res);
        console.log(initData);
        initData.data.sort((a, b) => (a?.order as number) - (b?.order as number));
        return { ...initData, info: user };
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

    public async updateOrder(user: IUser): Promise<any> {
        const [resultHeader] = await pool.query(userQuery.updateOrder(user));
        const res = packetToJson(resultHeader) as any [];
        return res;
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
