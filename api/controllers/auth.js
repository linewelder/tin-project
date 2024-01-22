import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";

function createAuthToken(user) {
    const claims = {
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
    };

    return jwt.sign(claims, "mysecret");
}

const userSchema = joi.object({
    email: joi.string()
        .max(75)
        .required(),
    firstName: joi.string()
        .max(30)
        .required(),
    lastName: joi.string()
        .max(30)
        .required(),
    password: joi.string()
        .max(32)
        .required(),
}); 

export async function register(req, res) {
    const data = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };

    const { error } = userSchema.validate(data);
    if (error) {
        res.status(400).json({
            error: error.details[0].message,
            formattable: false,
        });
        return;
    }

    const existingUser = await db.query("SELECT * FROM User WHERE Email = ?", [data.email]);
    if (existingUser.length > 0) {
        return res.status(409)
            .json({ error: "email-exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const newUser = {
        email: data.email,
        password: hash,
        firstName: data.firstName,
        lastName: data.lastName,
        admin: false
    };

    const result = await db.query(
        "INSERT INTO User(Email, Password, FirstName, LastName, IsAdmin) VALUES (?)",
        [[newUser.email, newUser.password, newUser.firstName, newUser.lastName, newUser.admin ? 1 : 0]]);
    newUser.id = result.insertId;

    res.json({
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        admin: false,
        token: createAuthToken(newUser)
    });
}

export async function login(req, res) {
    const rows = await db.query(
        "SELECT * FROM User WHERE Email = ?",
        [req.body.email]);

    if (rows.length === 0) {
        res.status(404).json({ "error": "wrong-login-data" });
        return;
    }

    const passwordCorrect = bcrypt.compareSync(req.body.password, rows[0].Password);
    if (!passwordCorrect) {
        res.status(401).json({ "error": "wrong-login-data" });
        return;
    }

    const user = {
        id: rows[0].IdUser,
        email: rows[0].Email,
        firstName: rows[0].FirstName,
        lastName: rows[0].LastName,
        admin: rows[0].IsAdmin
    };
    user.token = createAuthToken(user);
    res.json(user);
}
