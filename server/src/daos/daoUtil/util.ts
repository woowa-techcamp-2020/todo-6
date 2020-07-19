import { RowDataPacket, OkPacket } from 'mysql2';

export interface ICard {
    cardID: number,
    cardText: string,
    created: Date,
}

export interface IList {
    listID: number,
    listName: string,
    cards: [ICard?]
}
export interface IInitData{
    data: [IList?]
}

export const packetToJson = (packet: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]):Array<any> => {
    const string = JSON.stringify(packet);
    return JSON.parse(string);
};