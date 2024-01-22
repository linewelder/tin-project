import joi from "joi";
import db from "../db.js";
import { getPaginationParams, tryValidate } from "../validation.js";

export async function getAll(req, res) {
    const [first, count] = getPaginationParams(req);

    const totalCount = (await db.query(
        "SELECT Count(1) AS TotalCount FROM Participant"))[0].TotalCount;

    const rows = await db.query(
        "SELECT IdParticipant, FirstName, LastName " +
        "FROM Participant " +
        "LIMIT ? OFFSET ?",
        [count, first]);
    const elements = rows.map(row => ({
        id: row.IdParticipant,
        firstName: row.FirstName,
        lastName: row.LastName,
    }));
    return res.json({ totalCount, elements });
};

export async function getOne(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query(
        "SELECT IdParticipant, FirstName, LastName " +
        "FROM Participant " +
        "WHERE IdParticipant = ?",
        [id]);
    if (rows.length == 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }

    const participant = {
        id: rows[0].IdParticipant,
        firstName: rows[0].FirstName,
        lastName: rows[0].LastName,
    };

    const recordRows = await db.query(
        "SELECT Tournament.IdCategory, Category.Name AS CategoryName, Min(Time) AS Record " +
        "FROM TournamentParticipant " +
        "JOIN Tournament ON Tournament.IdTournament = TournamentParticipant.IdTournament " +
        "JOIN Category ON Category.IdCategory = Tournament.IdCategory " +
        "WHERE IdParticipant = ? " +
        "GROUP BY Tournament.IdCategory",
        [id]);
    participant.records = recordRows.map(row => ({
        idCategory: row.IdCategory,
        category: row.CategoryName,
        result: row.Record,
    }));

    res.json(participant);
}

const newParticipantSchema = joi.object({
    firstName: joi.string()
        .max(30)
        .required(),
    lastName: joi.string()
        .max(30)
        .required(),
});

export async function addNew(req, res) {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    if (!tryValidate(res, data, newParticipantSchema)) {
        return;
    }

    const result = await db.query(
        "INSERT INTO Participant(FirstName, LastName) VALUES (?)",
        [[data.firstName, data.lastName]]);
    data.id = result.insertId;

    res.json(data);
}

export async function deleteOne(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query("DELETE FROM Participant WHERE IdParticipant = ?", [id]);
    if (rows.rowCount === 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }

    res.status(204).end();
};

const updateParticipantSchema = joi.object({
    firstName: joi.string()
        .max(30)
        .required(),
    lastName: joi.string()
        .max(30)
        .required(),
});

export async function update(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ error: "not-found" });

    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    if (!tryValidate(res, data, updateParticipantSchema)) {
        return;
    }

    const rows = await db.query(
        "UPDATE Participant " +
        "SET FirstName=?, LastName=? " +
        "WHERE IdParticipant = ?",
        [data.firstName, data.lastName, id]);
    if (rows.rowCount === 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }
    res.json({});
}
