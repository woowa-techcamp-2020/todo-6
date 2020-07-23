export interface ICard {
    cardID?: number,
    cardText?: string,
    listID?: number,
    created?: Date,
    updated?: Date
}

export interface IUser {
    userID?: number;
    name?: string;
    id?: string;
    password?: string;
}

export interface IList {
    userID?: number,
    listID?: number,
    listName?: string,
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
    info?: {
        usreID?: number,
        id?: string
    },
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
