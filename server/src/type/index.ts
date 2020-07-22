export interface ICard {
    cardID?: number,
    cardText?: string,
    listID?: number,
    created?: Date,
    updated?: Date
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
export interface IInitData{
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
