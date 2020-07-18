import mysql from 'mysql2/promise';
import Connection from 'mysql/lib/Connection';

const connection:Connection = mysql.createPool({
    host: process.env.REMOTE_HOST,
    user: process.env.USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
});

export default connection;