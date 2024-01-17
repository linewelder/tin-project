import db from "../db.js";

function toModel(row) {
    return {
        id: row.IdCategory,
        name: row.Name,
        description: row.Description
    };
}

export const getAll = async (req, res) => {
    const rows = await db.query("SELECT * FROM Category");
    const categories = rows.map(toModel);
    return res.json(categories);
};

export const getOne = async (req, res) => {
    const id = req.params.id;

    const rows = await db.query("SELECT * FROM Category WHERE IdCategory = ?", [id]);
    if (rows.length == 0) {
        res.status(404).json({ "error": `Category with ID ${id} not found` });
        return;
    }

    const category = toModel(rows[0]);
    res.json(category);
};
