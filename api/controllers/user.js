import db from "../db.js";
import { getPaginationParams } from "../validation.js";

export async function getTournaments(req, res) {
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const [first, count] = getPaginationParams(req);

    const totalCount = (await db.query(
        "SELECT Count(1) AS TotalCount FROM Tournament " +
        "WHERE Organizer = ?",
        [id]))[0].TotalCount;

    const rows = await db.query(
        "SELECT IdTournament, Tournament.Name AS Name," +
        "       Date, Category.Name AS CategoryName, IsClosed " +
        "FROM Tournament " +
        "JOIN Category ON Category.IdCategory = Tournament.IdCategory " +
        "WHERE Organizer = ? " +
        "LIMIT ? OFFSET ?",
        [id, count, first]);
    const elements = rows.map(row => ({
        id: row.IdTournament,
        name: row.Name,
        date: row.date,
        category: row.CategoryName,
        isClosed: row.IsClosed,
    }));
    return res.json({ totalCount, elements });
};
