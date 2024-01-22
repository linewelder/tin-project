import db from "../db.js";
import { getPaginationParams, tryValidate } from "../validation.js";
import joi from "joi";

export async function getAll(req, res) {
    const [first, count] = getPaginationParams(req);

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
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const rows = await db.query(
        "SELECT IdTournament, Tournament.Name AS Name, Date, Address," +
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
        address: rows[0].Address,
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
    const id = req.params.id;
    if (id < 1) return res.status(404).json({ "error": "not-found" });

    const [first, count] = getPaginationParams(req);

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

const newTournamentSchema = joi.object({
    name: joi.string()
        .max(50)
        .required(),
    date: joi.string()
        .isoDate(),
    address: joi.string()
        .max(150)
        .required(),
    idCategory: joi.number()
        .min(1)
        .required(),
    participants: joi.array()
        .items(joi.number().min(1))
});

export async function addNew(req, res) {
    const data = {
        name: req.body.name,
        date: req.body.date,
        address: req.body.address,
        idCategory: req.body.idCategory,
        participants: req.body.participants,
    };
    if (!tryValidate(res, data, newTournamentSchema)) {
        return;
    }

    data.organizer = req.claims.id;
    data.isClosed = false;

    const result = await db.query(
        "INSERT INTO Tournament(Name, Date, Address, IdCategory, Organizer, IsClosed) VALUES (?)",
        [[data.name, data.date, data.address, data.idCategory, data.organizer, data.isClosed]]);
    data.id = result.insertId;

    const participantData = data.participants.map(x => [x, data.id]);
    await db.query(
        "INSERT INTO TournamentParticipant(IdParticipant, IdTournament) VALUES ?",
        [participantData]);

    res.json(data);
}
