export interface IUser {
    id: number;
    name: string;
    password: string;
}

class User implements IUser {
    public id: number;

    public name: string;

    public password: string;

    constructor(nameOrUser: string | IUser, email?: string, id?: number) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.password = email || '';
            this.id = id || -1;
        } else {
            this.name = nameOrUser.name;
            this.password = nameOrUser.password;
            this.id = nameOrUser.id;
        }
    }
}

export default User;
