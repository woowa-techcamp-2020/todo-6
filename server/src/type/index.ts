export interface ICard {
    cardID?: number,
    userID?: number
    cardText?: string,
    listID?: number,
    created?: Date,
    updated?: Date
    id?: string
}

export interface IUser {
    userID?: number;
    name?: string;
    id?: string;
    password?: string;
    orders?: string;
}

export interface IOrderData {
    newOrder?: number,
    oldOrder?: number,
    listID?: number,
}

export interface IList {
    userID?: number,
    isPrivate?: number,
    listID?: number,
    listName?: string,
    order?: number
    orders?: string
    cards?: [ICard?]
    created?: Date,
    updated?: Date
}

export interface IEvent {
    logID?: number,
    userID?: number,
    eventTypeID?: number,
    card?: string,
    list?: string,
    beforeList?: string,
    created?: Date,
}
export interface IInitData{
    info?: IUser,
    data: [IList?]
}



export interface IResultHeader{
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number
}
