import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "v4HIhqAozSMJ9AUL0DKzZASLM",
    database: "tin"
});

export default db;
