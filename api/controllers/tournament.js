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
