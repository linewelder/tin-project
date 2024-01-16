const categories = [
    {
        id: 1,
        name: "3x3x3",
    },
    {
        id: 2,
        name: "4x4x4",
    },
    {
        id: 3,
        name: "Skewb",
    },
];

export const getAll = (req, res) => {
    res.json(categories);
};
