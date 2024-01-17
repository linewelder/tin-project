const categories = [
    {
        id: 1,
        name: "3x3x3",
        description: "Klasyczna najzwyczajniejsza kosta Rubika."
    },
    {
        id: 2,
        name: "4x4x4",
        description: "Nadal nie zbyt dziwna kostka, tylko trochę większa."
    },
    {
        id: 3,
        name: "Skewb",
        description: "o_0 co to?"
    },
];

export const getAll = (req, res) => {
    res.json(categories);
};

export const getOne = (req, res) => {
    const id = req.params.id;

    const category = categories.find(cat => cat.id == id);
    if (category === undefined) {
        response.status(404).json({ error: "Category not found." });
        return;
    }

    res.json(categories);
};
