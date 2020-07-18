import { IUser } from '@entities/User';
import { getRandomInt } from '@shared/functions';
import { IInitData } from '@daos/daoUtil/util';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IUserDao } from './UserDao';


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
