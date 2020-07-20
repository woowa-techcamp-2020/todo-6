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

class UserDao implements IUserDao {
    /**
     * @description make response object to IInitData type object
     * @param {any[]} res
     * @returns {IInitData}
     */
    private resToInit(res: any[]): IInitData {
        const initData: IInitData = {
            data: [],
        };

        const lists: {[key:number]: IList} = {};

        res.forEach((data) => {
            console.log(data);
            const {
                listID, listName, cardID, cardText, created, 
            } = data;
            if(lists[listID]) {
                lists[listID].cards.push({
                    cardID,
                    cardText,
                    created,
                });
            }else {
                lists[listID] = {
                    listID,
                    listName,
                    cards: [
                        {
                            cardID,
                            cardText,
                            created,
                        },
                    ],
                };
            }
        });

        Object.keys(lists).forEach((listID) => {
            initData.data.push(lists[parseInt(listID)]);
        });


        return initData;
    }

    public async get(id: number): Promise<IInitData> {
        const [rowPacket] = await pool.query(userQuery.getUserData(id));
        const res = packetToJson(rowPacket) as any[];

        return this.resToInit(res);
    }

    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        const [row] = await pool.query('select user.id cardText, from card '
            + 'left join list on card.listID = list.listID '
            + 'left join user on list.userID = user.userID '
            + 'where user.id = ?', ['auddn6676']);
        console.log(row);
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
