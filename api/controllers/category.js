import joi from "joi";
import db from "../db.js";
import { toCategory, toTournament } from "../models.js";
import { getPaginationParams, tryValidate } from "../validation.js";

export async function getAll(req, res) {
    const rows = await db.query("SELECT * FROM Category");
    const categories = rows.map(toCategory);
    return res.json(categories);
};

export async function getOne(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query("SELECT * FROM Category WHERE IdCategory = ?", [id]);
    if (rows.length == 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }

    const category = toCategory(rows[0]);
    res.json(category);
};

export async function getCurrentTournaments(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query(
        "SELECT * FROM Tournament WHERE IdCategory = ? AND IsClosed = 0", [id]);
    const tournaments = rows.map(toTournament);
    res.json(tournaments);
};

export async function getTournamentHistory(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const [first, count] = getPaginationParams(req);

    const totalCount = (await db.query(
        "SELECT Count(1) AS TotalCount FROM Tournament " +
        "WHERE IdCategory = ? AND IsClosed = 1",
        [id]))[0].TotalCount;

    const rows = await db.query(
        "SELECT * FROM Tournament " +
        "WHERE IdCategory = ? AND IsClosed = 1 " +
        "LIMIT ? OFFSET ?",
        [id, count, first]);
    const elements = rows.map(toTournament);
    res.json({ totalCount, elements });
};

export async function getBestParticipants(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query(
        "SELECT Participant.IdParticipant, Tournament.IdTournament, FirstName, LastName, Date, Time " +
        "FROM TournamentParticipant " +
        "JOIN Tournament ON Tournament.IdTournament = TournamentParticipant.IdTournament " +
        "JOIN Participant ON Participant.IdParticipant = TournamentParticipant.IdParticipant " +
        "WHERE IdCategory = ? AND Time IS NOT NULL " +
        "ORDER BY Time " +
        "LIMIT 10",
        [id]);
    res.json(rows.map(row => ({
        participantId: row.IdParticipant,
        tournamentId: row.IdTournament,
        firstName: row.FirstName,
        lastName: row.LastName,
        date: row.Date,
        result: row.Time,
    })));
}

const newCategorySchema = joi.object({
    name: joi.string()
        .max(20)
        .required(),
    description: joi.string()
        .max(200)
        .required(),
});

export async function addNew(req, res) {
    const data = {
        name: req.body.name,
        description: req.body.description,
    };
    if (!tryValidate(res, data, newCategorySchema)) {
        return;
    }

    const result = await db.query(
        "INSERT INTO Category(Name, Description) VALUES (?)",
        [[data.name, data.description]]);
    data.id = result.insertId;

    res.json(data);
}

export async function deleteOne(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query("DELETE FROM Category WHERE IdCategory = ?", [id]);
    if (rows.rowCount === 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }

    res.status(204).end();
};

const updateCategorySchema = joi.object({
    name: joi.string()
        .max(20)
        .required(),
    description: joi.string()
        .max(200)
        .required(),
});

export async function update(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ error: "not-found" });

    const data = {
        name: req.body.name,
        description: req.body.description,
    };
    if (!tryValidate(res, data, updateCategorySchema)) {
        return;
    }

    const rows = await db.query(
        "UPDATE Category " +
        "SET Name=?, Description=? " +
        "WHERE IdCategory = ?",
        [data.name, data.description, id]);
    if (rows.rowCount === 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }
    res.json({});
}
