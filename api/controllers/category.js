import db from "../db.js";
import { toCategory, toTournament } from "../models.js";
import { getPaginationParams } from "../validation.js";

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
        "SELECT Participant.IdParticipant, FirstName, LastName, Date, Time " +
        "FROM TournamentParticipant " +
        "JOIN Tournament ON Tournament.IdTournament = TournamentParticipant.IdTournament " +
        "JOIN Participant ON Participant.IdParticipant = TournamentParticipant.IdParticipant " +
        "WHERE IdCategory = ? " +
        "ORDER BY Time " +
        "LIMIT 10",
        [id]);
    res.json(rows.map(row => ({
        participantId: row.IdParticipant,
        firstName: row.FirstName,
        lastName: row.LastName,
        date: row.Date,
        result: row.Time,
    })));
}
