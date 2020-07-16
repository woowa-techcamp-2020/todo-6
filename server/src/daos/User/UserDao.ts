import { IUser } from '@entities/User';
import mysql from 'mysql2';

export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao implements IUserDao {
    remoteHost = '15.165.167.135';

    userName = 'todo';

    databaseName = 'todoDB';

    password = '1234';

    // create the connection to database
    connection = mysql.createConnection({
        host: process.env.REMOTE_HOST,
        user: process.env.USER_NAME,
        database: process.env.DATABASE_NAME,
        password: process.env.PASSWORD,
    });

    /**
     * @param email
     */
    public async getOne(email: string): Promise<IUser | null> {
        return [] as any;
    }


    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        // console.log(this.connection.query('insert into user(id, password, name) values(\'myID\', \'myPW\', \'명우\')'));
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
