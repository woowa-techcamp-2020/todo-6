export interface ICard {
    cardID?: number,
    cardText?: string,
    listID?: number,
    created?: Date,
}

export interface IList {
    listID?: number,
    listName?: string,
    cards: [ICard?]
}
export interface IInitData{
    data: [IList?]
}