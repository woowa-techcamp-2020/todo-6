import { RowDataPacket, OkPacket } from 'mysql2';

export const packetToJson = (packet: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]):Array<any> => {
    const string = JSON.stringify(packet);
    return JSON.parse(string);
};

export const getSqlTIme = () => new Date().toISOString().slice(0, 19).replace('T', ' ');


/**
 * @description fix template literal that can't insert string
 * @param {any[]} keys
 * @returns {string}
 */
export const valueToString = (keys: any []) => {
    let resultString = '';
    keys.forEach((key) => {
        if(typeof key === 'string') {
            resultString += `,'${key}'`;
        }else {
            resultString += `,${key}`;
        }
    });
    resultString = resultString.substring(1, resultString.length);
    return resultString;
};