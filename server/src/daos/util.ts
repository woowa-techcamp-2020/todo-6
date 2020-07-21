import { RowDataPacket, OkPacket } from 'mysql2';

export const packetToJson = (packet: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[]):Array<any> | object => {
    const string = JSON.stringify(packet);
    return JSON.parse(string);
};

/**
 * @description get date object setting by korea timezone
 * @returns {Date}
 */
export const getKoreaTime = () => {
    const date = new Date(); // 2018-07-24:17:26:00 (Look like GMT+0)
    const myTimeZone = 9; // my timeZone
    // my timeZone = 7h = 7 * 60 * 60 * 1000 (millisecond);
    // 2018-07-24:17:26:00 = x (milliseconds)
    // finally, time in milliseconds (GMT+7) = x + myTimezone
    date.setTime(date.getTime() + myTimeZone * 60 * 60 * 1000);
    return date;
};

export const getSqlTime = () => getKoreaTime().toISOString().slice(0, 19).replace('T', ' ');


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