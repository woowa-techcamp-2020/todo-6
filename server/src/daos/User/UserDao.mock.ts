import { getRandomInt } from '@shared/functions';
import { IInitData, IUser } from '@type';
import pool from '@daos/db';
import { userQuery } from '@daos/query';
import { packetToJson } from '@daos/util';
import { IUserDao } from './UserDao';
import { MockDaoMock } from '../MockDb/MockDao.mock';


class UserDao extends MockDaoMock implements IUserDao {
    public async get(id: number): Promise<IInitData> {
        try {
            const db = await super.openDb();
            return db.userData;
        } catch (err) {
            throw err;
        }
    }


    public async getAll(): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.userData;
        } catch (err) {
            throw err;
        }
    }

    public async getUser(id: string): Promise<any []> {
        const [rowPacket] = await pool.query(userQuery.getUser(id));
        const res = packetToJson(rowPacket) as any[];
        console.log(res);

        return [] as any [];
    }

    public async add(user: any): Promise<void> {
        try {
            const db = await super.openDb();
            // user.id = getRandomInt();
            db.userData.data[0].cards.push(user);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }


    public async update(user: IUser): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === user.id) {
                    db.users[i] = user;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        } catch (err) {
            throw err;
        }
    }


    public async delete(id: number): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === id) {
                    db.users.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('User not found');
        } catch (err) {
            throw err;
        }
    }
}

export default UserDao;
