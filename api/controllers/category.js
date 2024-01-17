import db from "../db.js";

function toModel(row) {
    return {
        id: row.IdCategory,
        name: row.Name,
        description: row.Description
    };
}

export const getAll = (req, res) => {
    db.query("SELECT * FROM Category", (err, data) => {
        if (err) throw err;

        const categories = data.map(toModel);
        return res.json(categories);
    });
};

export const getOne = (req, res) => {
    const id = req.params.id;

    db.query(
        "SELECT * FROM Category WHERE IdCategory = ?", [id],
        (err, data) => {
            if (err) throw err;

            if (data.length == 0) {
                res.status(404).json({ "error": `Category with ID ${id} not found` });
                return;
            }

            const category = toModel(data[0]);
            res.json(category);
        });
};
