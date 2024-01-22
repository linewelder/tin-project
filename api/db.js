import mysql from "mysql";
import { promisify } from "util";

import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone : "+00:00",
});

export default {
    query: promisify(db.query).bind(db)
};
