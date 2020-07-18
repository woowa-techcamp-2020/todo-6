export const userQuery: {
    getUserData: (id:string) => string
} = {
    getUserData: (id) => 'select * from card '
            + 'left join list on card.listID = list.listID '
            + 'left join user on list.userID = user.userID '
            + `where id = '${id}'`,
};

export const listQuery = {

};

export const cardQuery = {

};

