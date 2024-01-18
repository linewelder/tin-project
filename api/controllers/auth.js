import db from "../db.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
    const existingUser = await db.query("SELECT * FROM User WHERE Email = ?", [req.body.email]);
    if (existingUser.length > 0) {
        return res.status(409)
            .json({ error: "User with this e-mail already exists" });
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

    res.json(newUser);
}
