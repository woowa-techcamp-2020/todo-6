import { ICard } from '@type';
import { getSqlTIme, valueToString } from './util';

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
    updateCard: (listID: number, card: ICard) => string
    add: (card: ICard) => string
} = {
    updateCard: (listID, card) => 'update card '
        + `set  cardText="${card.cardText}", updated="${getSqlTIme()}"`
        + `where (list.listID=${listID}, cardID=${card.cardID})`,
    add: (card) => 'insert into '
        + `card(${Object.keys(card)}) `
        + `values (${valueToString(Object.values(card))})`,
};

