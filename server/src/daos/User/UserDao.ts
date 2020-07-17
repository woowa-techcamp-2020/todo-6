import User, { IUser } from '@entities/User';
import mysql from 'mysql2/promise';

export interface IUserDao {
    getOne: (id: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {
    pool: any = mysql.createPool({
        host: process.env.REMOTE_HOST,
        user: process.env.USER_NAME,
        database: process.env.DATABASE_NAME,
        password: process.env.PASSWORD,
    });

    /**
     * @param email
     */
    public async getOne(id: string): Promise<IUser | null> {
        const [row] = await this.pool.query('select * from user '
            + 'where id = ?',
        [id]);
        return new User(row.shift());
    }

    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        const [row] = await this.pool.query('select cardText, listName, from card '
            + 'left join list on card.listID = list.listID '
            + 'left join user on list.userID = user.userID '
            + 'where id = ?', ['auddn6676']);
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
