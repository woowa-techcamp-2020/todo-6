import { ICard } from '@type';
import { getSqlTime, valueToString } from './util';

export const userQuery: {
    getUserData: (id:number) => string
} = {
    getUserData: (id) => 'select * from card '
            + 'left join list on card.listID = list.listID '
            + 'left join user on list.userID = user.userID '
            + `where user.userID = '${id}'`,
};

export const listQuery = {

};

export const cardQuery: {
    update: (card: ICard) => string
    add: (card: ICard) => string,
    delete: (cardID: number) => string,
} = {
    update: (card) => 'update card '
        + `set  cardText="${card.cardText}", updated="${getSqlTime()}"`
        + `where (cardID=${card.cardID})`,
    add: (card) => 'insert into '
        + `card(${Object.keys(card)}, created, updated) `
        + `values (${`${valueToString(Object.values(card))},'${getSqlTime()}','${getSqlTime()}'`})`,
    delete: (cardID) => `delete from card where cardID = ${cardID};`,
};

