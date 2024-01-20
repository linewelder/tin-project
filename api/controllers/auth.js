import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function createAuthToken(user) {
    const claims = {
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
    };

    return jwt.sign(claims, "mysecret");
}

export async function register(req, res) {
    const existingUser = await db.query("SELECT * FROM User WHERE Email = ?", [req.body.email]);
    if (existingUser.length > 0) {
        return res.status(409)
            .json({ error: "email-exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admin: false
    };

    const result = await db.query(
        "INSERT INTO User(Email, Password, FirstName, LastName, IsAdmin) VALUES (?)",
        [[newUser.email, newUser.password, newUser.firstName, newUser.lastName, newUser.admin ? 1 : 0]]);
    newUser.id = result.insertId;

    res.json({
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
        email: rows[0].Email,
        firstName: rows[0].FirstName,
        lastName: rows[0].LastName,
        admin: rows[0].IsAdmin
    };
    user.token = createAuthToken(user);
    res.json(user);
}
