import mysql, { Pool } from 'mysql2/promise';

const connection:Pool = mysql.createPool({
    host: process.env.REMOTE_HOST,
    user: process.env.USER_NAME,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
});

export default connection;