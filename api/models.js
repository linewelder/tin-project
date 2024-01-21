export function toCategory(row) {
    return {
        id: row.IdCategory,
        name: row.Name,
        description: row.Description
    };
}
