export function toTournament(row) {
    return {
        id: row.IdTournament,
        name: row.Name,
        date: row.Date
    };
}

export function toCategory(row) {
    return {
        id: row.IdCategory,
        name: row.Name,
        description: row.Description
    };
}
