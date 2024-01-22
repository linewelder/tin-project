import db from "../db.js";

export async function getParticipants(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query(
        "SELECT Participant.IdParticipant, FirstName, LastName, Time " +
        "FROM TournamentParticipant " +
        "JOIN Participant ON Participant.IdParticipant = TournamentParticipant.IdParticipant " +
        "WHERE IdTournament = ? ",
        [id]);

    const participants = rows.map(row => ({
        id: row.IdParticipant,
        firstName: row.FirstName,
        lastName: row.LastName,
        result: row.Time,
    }));
    res.json(participants);
}
