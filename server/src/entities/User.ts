export interface IUser {
    id: number;
    name: string;
    password: string;
}

class User implements IUser {
    public id: number;

    public name: string;

    public password: string;

    constructor(newUser: IUser) {
        this.name = newUser.name;
        this.password = newUser.password;
        this.id = newUser.id;
    }
}

export default User;
