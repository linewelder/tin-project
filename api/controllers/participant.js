import db from "../db.js";

export async function getAll(req, res) {
    const first = +req.query.first || 0;
    const count = +req.query.count || 8;

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
    res.json(participant);
}
