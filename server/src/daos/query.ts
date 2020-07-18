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

export const cardQuery = {

};

