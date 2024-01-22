import db from "../db.js";

export async function getAll(req, res) {
    const first = +req.query.first || 0;
    const count = +req.query.count || 8;

    const totalCount = (await db.query(
        "SELECT Count(1) AS TotalCount FROM Tournament"))[0].TotalCount;

    const rows = await db.query(
        "SELECT IdTournament, Tournament.Name AS Name," +
        "       Date, Category.Name AS CategoryName, IsClosed " +
        "FROM Tournament " +
        "JOIN Category ON Category.IdCategory = Tournament.IdCategory " +
        "LIMIT ? OFFSET ?",
        [count, first]);
    const elements = rows.map(row => ({
        id: row.IdTournament,
        name: row.Name,
        date: row.date,
        category: row.CategoryName,
        isClosed: row.IsClosed,
    }));
    return res.json({ totalCount, elements });
};

export async function getOne(req, res) {
    const id = req.params.id;

    const rows = await db.query(
        "SELECT IdTournament, Tournament.Name AS Name, Date," +
        "       Category.Name AS CategoryName, IsClosed," +
        "       FirstName, LastName " +
        "FROM Tournament " +
        "JOIN Category ON Category.IdCategory = Tournament.IdCategory " +
        "JOIN User ON IdUser = Organizer " +
        "WHERE Tournament.IdTournament = ?",
        [id]);
    if (rows.length == 0) {
        res.status(404).json({ "error": "not-found" });
        return;
    }

    const tournament = {
        id: rows[0].IdTournament,
        name: rows[0].Name,
        date: rows[0].Date,
        category: rows[0].CategoryName,
        organizer: {
            firstName: rows[0].FirstName,
            lastName: rows[0].LastName,
        },
        isClosed: rows[0].IsClosed,
    };
    res.json(tournament);
}

export async function getParticipants(req, res) {
    const id = +req.params.id;

    const first = +req.query.first || 0;
    const count = +req.query.count || 8;

    const totalCount = (await db.query(
        "SELECT Count(1) AS TotalCount " +
        "FROM TournamentParticipant " +
        "WHERE IdTournament = ?",
        [id]))[0].TotalCount;

    const rows = await db.query(
        "SELECT Participant.IdParticipant, FirstName, LastName, Time " +
        "FROM TournamentParticipant " +
        "JOIN Participant ON Participant.IdParticipant = TournamentParticipant.IdParticipant " +
        "WHERE IdTournament = ? " +
        "LIMIT ? OFFSET ?",
        [id, count, first]);

    const elements = rows.map(row => ({
        id: row.IdParticipant,
        firstName: row.FirstName,
        lastName: row.LastName,
        result: row.Time,
    }));
    res.json({ totalCount, elements });
}
