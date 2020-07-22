import { ICard, IList } from '@type';
import { getSqlTime, valueToString } from './util';

export const userQuery: {
    getUserData: (id:number) => string
} = {
    getUserData: (id) => 'select '
        + 'list.listID, listName, user.userID, card.created, card.updated, cardID, cardText '
        + 'from list '
            + 'left join user on list.userID = user.userID '
            + 'left join card on card.listID = list.listID '
            + `where user.userID = '${id}'`,
};

export const listQuery: {
    update: (list: IList) => string
    add: (list: IList) => string,
    delete: (listID: number) => string,
} = {
    update: (list) => 'update list '
        + `set  listName="${list.listName}", updated="${getSqlTime()}"`
        + `where (listID=${list.listID})`,
    add: (list) => 'insert into '
        + `list (${Object.keys(list)}, created, updated) `
        + `values (${`${valueToString(Object.values(list))},'${getSqlTime()}','${getSqlTime()}'`})`,
    delete: (listID) => `delete from list where listID = ${listID};`,
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

