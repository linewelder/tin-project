import db from "../db.js";
import { getPaginationParams } from "../validation.js";

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
