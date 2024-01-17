import mysql from "mysql";
import { promisify } from "util";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "v4HIhqAozSMJ9AUL0DKzZASLM",
    database: "tin"
});

export default {
    query: promisify(db.query).bind(db)
};
